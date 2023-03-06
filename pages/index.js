import Navbar from "../components/Navbar";
import { styled, useStyletron } from "styletron-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Container = styled("div", {
	display: "grid",
	gridTemplateColumns: "0.5fr 2.2fr 0.5fr",
	gridTemplateRows: "1fr 1fr 1fr",
});

const CarouselContainer = styled("div", {
	display: "flex",
	justifyContent: "center",
	marginTop: "2.4rem",
	marginBottom: "1rem",
	gridColumnStart: "2",
});

const SectionContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	gridColumnStart: "2",
	width: "1200px",
	marginLeft: "auto",
	marginRight: "auto",
});

const Section = styled("p", {
	fontSize: "1.25rem",
	marginTop: "4rem",
	marginBottom: "2rem",
});

const PostersContainer = styled("div", {
	display: "flex",
	justifyContent: "space-between",
});

const CardContainer = styled("div", {
	flexDirection: "column",
});

const MovieLink = styled(Link, {
	color: "inherit",
	textDecoration: "none",
});

const MovieName = styled("p", {
	fontSize: "1rem",
	lineHeight: "1.25rem",
	maxWidth: "140px",
});

const MovieDuration = styled("p", {
	fontSize: "0.875rem",
	fontWeight: "400",
	color: "#9B9B9B",
});

export default function Home({ movies }) {
	const [css] = useStyletron();

	let moviesData = movies.results;
	console.log("// moviesData ===", moviesData);

	// trois premier films en tendances
	const firstThreeTrendingMovies = moviesData.slice(0, 3);

	// films tries par date de sortie
	const moviesSortedByDate = moviesData.sort(
		(a, b) =>
			new Date(b.release_date || b.first_air_date) -
			new Date(a.release_date || a.first_air_date)
	);

	const mostRecentMovies = moviesSortedByDate.slice(0, 7);
	// console.log("// sorted by date ===", mostRecentMovies);

	// films tries par note
	const moviesSortedByRatings = [...moviesData].sort(
		(a, b) => b.vote_average - a.vote_average
	);

	const bestRatedMovies = moviesSortedByRatings.slice(0, 7);
	// console.log("// sorted by ratings ===", bestRatedMovies);

	return (
		<>
			<Navbar />
			<Container>
				<Image
					src={`https://image.tmdb.org/t/p/w500${firstThreeTrendingMovies[0].backdrop_path}`}
					alt='Background image'
					height={200}
					width={140}
					className={css({
						position: "absolute",
						top: "0",
						width: "100%",
						height: "60%",
						maskImage:
							"linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 30%, transparent 100%);",
						zIndex: "-999",
						filter: "blur(2rem)",
					})}
				/>
				<CarouselContainer>
					<Swiper
						autoHeight
						height={350}
						direction={"vertical"}
						pagination
						autoplay={{
							delay: 4000,
						}}
						modules={[Pagination, Autoplay]}
						className={css({
							color: "#000000",
							borderRadius: "0.5rem",
						})}
					>
						{firstThreeTrendingMovies.map((movie) => (
							<SwiperSlide key={movie.id}>
								<Image
									src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
									alt='Backdrop image'
									height={500}
									width={1200}
									className={css({
										borderRadius: "0.5rem",
									})}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</CarouselContainer>
				<SectionContainer>
					<Section>À l'affiche cette semaine</Section>
					<Swiper
						slidesPerView={7}
						spaceBetween={220}
						navigation={true}
						modules={[Navigation]}
					>
						<SwiperSlide>
							<PostersContainer>
								{mostRecentMovies.map((movie) => (
									<CardContainer key={movie.id}>
										<MovieLink
											href={{
												pathname: "/MovieDetail",
												query: {
													name: `${movie.original_title || movie.name}`,
												},
											}}
											// as={`/movie/${movie.original_title || movie.name}`}
										>
											<Image
												key={movie.id}
												src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
												alt='Poster image'
												height={200}
												width={140}
												className={css({
													borderRadius: "0.25rem",
												})}
											/>
											<MovieName>
												{movie.original_title || movie.name}
											</MovieName>
										</MovieLink>
										<MovieDuration>1h48</MovieDuration>
									</CardContainer>
								))}
							</PostersContainer>
						</SwiperSlide>
					</Swiper>
				</SectionContainer>
				<SectionContainer>
					<Section>Les films les mieux notés</Section>
					<PostersContainer>
						{bestRatedMovies.map((movie) => (
							<CardContainer key={movie.id}>
								<MovieLink
									href={{
										pathname: "/MovieDetail",
										query: {
											name: `${movie.original_title || movie.name}`,
										},
									}}
									as={`/movie-detail/${movie.original_title || movie.name}`}
								>
									<Image
										key={movie.id}
										src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
										alt='Poster image'
										height={200}
										width={140}
										className={css({
											borderRadius: "0.25rem",
										})}
									/>
									<MovieName>{movie.original_title || movie.name}</MovieName>
								</MovieLink>
								<meter
									max={10}
									min={0.0}
									value={movie.vote_average}
									high={0.75}
									low={0.25}
									optimum={0.8}
								>
									1h48
								</meter>
							</CardContainer>
						))}
					</PostersContainer>
				</SectionContainer>
			</Container>
		</>
	);
}

export const getStaticProps = async () => {
	const res = await fetch(
		`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}&language=fr`
	);
	const data = await res.json();

	return {
		props: { movies: data },
	};
};
