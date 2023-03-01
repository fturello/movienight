import Navbar from "../components/Navbar";
import { styled, useStyletron } from "styletron-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export const getStaticProps = async () => {
	const res = await fetch(
		"https://api.themoviedb.org/3/trending/all/day?api_key=8420bcf29704942b5b368531eaf1945a"
	);
	const data = await res.json();

	return {
		props: { movies: data },
	};
};

const Container = styled("div", {
	display: "grid",
	gridTemplateColumns: "0.4fr 2.2fr 0.4fr",
	gridTemplateRows: "1fr 1fr 1fr",
	// gap: "20px",
});

const CarouselContainer = styled("div", {
	display: "flex",
	justifyContent: "center",
	marginTop: "2.25rem",
	gridColumnStart: "2",
});

const Section = styled("p", {
	fontSize: "1.25rem",
	marginTop: "4rem",
});

const SectionContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	gridColumnStart: "2",
});

export default function Home({ movies }) {
	console.log(movies.results);
	const firstThreeTrendingMovies = movies.results.slice(0, 3);

	const [css] = useStyletron();
	return (
		<>
			<Navbar />
			<Container>
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
								{console.log(movie.backdrop_path)}
								<Image
									src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
									alt='Poster'
									height={350}
									width={1300}
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

					<Image
						src='https://image.tmdb.org/t/p/w500/130H1gap9lFfiTF9iDrqNIkFvC9.jpg'
						alt=''
						height={200}
						width={140}
					/>
				</SectionContainer>
			</Container>
		</>
	);
}
