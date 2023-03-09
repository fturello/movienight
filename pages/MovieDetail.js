import { useRouter } from "next/router";
import { styled, useStyletron } from "styletron-react";
import { Button, SIZE, KIND } from "baseui/button";
import Image from "next/image";

import Navbar from "../components/Navbar";
import Star from "../components/Star";

import trailer from "../assets/trailer.png";

export default function MovieDetail({ movies, genres }) {
	const [css] = useStyletron();
	const moviesResults = movies.results;

	const router = useRouter();
	const movieName = router.query.name;

	const filteredMovie = moviesResults.filter(
		(movie) =>
			movie.original_title === movieName ||
			movie.title === movieName ||
			movie.name === movieName
	);
	const selectedMovie = filteredMovie[0];

	const formatDate = (selectedMovie) => {
		return selectedMovie.release_date
			? selectedMovie.release_date.slice(0, 4)
			: selectedMovie.first_air_date.slice(0, 4);
	};

	const movieGenres = selectedMovie.genre_ids.map((id) => {
		const genre = genres.genres.find((g) => g.id === id);
		return genre ? genre.name : "";
	});

	const GridContainer = styled("div", {
		display: "grid",
		gridTemplateColumns: "0.5fr 2.2fr 0.5fr",
		gridTemplateRows: "1fr 1fr 1fr",
	});

	const Container = styled("div", {
		display: "flex",
		gridColumnStart: "2",
		width: "1200px",
		marginTop: "2.4rem",
		marginLeft: "auto",
		marginRight: "auto",
		justifyContent: "space-between",
	});

	const MovieLeftContainer = styled("div", {
		display: "flex",
		flexDirection: "column",
		width: "436px",
	});

	const MovieTitle = styled("h1", {
		fontFamily: "Archivo Black",
		fontSize: "2.75rem",
		textTransform: "uppercase",
	});

	const MovieDate = styled("h2", {
		fontFamily: "Archivo",
		fontSize: "2.75rem",
		fontWeight: "400",
		marginBottom: "2rem",
	});

	const MovieSpec = styled("p", {
		fontFamily: "Archivo",
		fontSize: "0.875rem",
		marginRight: "1rem",
	});

	const MovieInfoContainer = styled("div", {
		display: "flex",
	});

	const ButtonsContainer = styled("div", {
		display: "flex",
		gap: "0.5rem",
		marginTop: "1rem",
	});

	const SmallTitle = styled("p", {
		fontFamily: "Archivo",
		fontWeight: "600",
		marginBottom: "0.5rem",
		letterSpacing: "0.05rem",
	});

	const MovieOverviewContainer = styled("div", {
		marginTop: "2rem",
	});

	const MovieOverview = styled("p", {
		fontFamily: "Archivo",
		lineHeight: "24px",
	});

	const DirectionsContainer = styled("div", {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-between",
		marginTop: "3rem",
	});

	const DirectionContainer = styled("div", {
		display: "flex",
		flexDirection: "column",
	});

	const TrailersContainer = styled("div", {
		display: "flex",
		flexDirection: "column",
		gridRowStart: "2",
	});

	const TrailerTitle = styled("h1", {
		fontSize: "1.25rem",
		marginTop: "5rem",
		marginBottom: "1.25rem",
	});

	const TrailerVideos = styled("div", {
		display: "flex",
		gap: "2rem",
	});

	return (
		<>
			<Navbar />
			<GridContainer>
				<Container>
					<MovieLeftContainer>
						<MovieTitle>{selectedMovie.title || selectedMovie.name}</MovieTitle>
						<MovieDate>({formatDate(selectedMovie)})</MovieDate>
						<MovieSpec>{movieGenres.join(", ")}</MovieSpec>
						<MovieInfoContainer>
							<MovieSpec>2h22</MovieSpec>
							<meter
								max={10}
								min={0.0}
								value={selectedMovie.vote_average}
								high={0.75}
								low={0.25}
								optimum={0.8}
							></meter>
						</MovieInfoContainer>
						<ButtonsContainer>
							<Button
								size={SIZE.compact}
								kind={KIND.secondary}
								overrides={{
									BaseButton: {
										style: {
											width: "6.7rem",
											fontFamily: "Archivo",
											fontSize: "1rem",
										},
									},
								}}
							>
								Regarder
							</Button>
							<Button
								size={SIZE.compact}
								overrides={{
									BaseButton: {
										style: {
											width: "4.1rem",
											outline: "1px #ffffff solid",
											backgroundColor: "#00000000",
										},
									},
								}}
							>
								<Star />
							</Button>
						</ButtonsContainer>
						<MovieOverviewContainer>
							<SmallTitle>Synopsis</SmallTitle>
							<MovieOverview>{selectedMovie.overview}</MovieOverview>
						</MovieOverviewContainer>
						<DirectionsContainer>
							<DirectionContainer>
								<SmallTitle>Screenplay, Story</SmallTitle>
								<MovieOverview>Josh Miller</MovieOverview>
								<SmallTitle>Director</SmallTitle>
								<MovieOverview>Jeff Fowler</MovieOverview>
							</DirectionContainer>
							<DirectionContainer>
								<SmallTitle>Screenplay, Story</SmallTitle>
								<MovieOverview>Patrick Casey</MovieOverview>
								<SmallTitle>Screenplay</SmallTitle>
								<MovieOverview>John Whittington</MovieOverview>
							</DirectionContainer>
						</DirectionsContainer>
						<TrailersContainer>
							<TrailerTitle>Bandes annonces</TrailerTitle>
							<TrailerVideos>
								<Image
									src={trailer}
									height={193}
									width={344}
									alt='Trailer video'
								/>
								<Image
									src={trailer}
									height={193}
									width={344}
									alt='Trailer video'
								/>
								<Image
									src={trailer}
									height={193}
									width={344}
									alt='Trailer video'
								/>
							</TrailerVideos>
						</TrailersContainer>
					</MovieLeftContainer>
					<Image
						src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
						alt='Poster image'
						height={654}
						width={436}
						className={css({
							borderRadius: "0.25rem",
						})}
					/>
				</Container>
			</GridContainer>
		</>
	);
}

export const getStaticProps = async () => {
	const res = await fetch(
		`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}&language=fr`
	);
	const moviesData = await res.json();

	const res2 = await fetch(
		`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=fr`
	);
	const genresData = await res2.json();

	return {
		props: { movies: moviesData, genres: genresData },
	};
};
