import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { styled, useStyletron } from "styletron-react";
import { Button, SIZE, KIND } from "baseui/button";
import Image from "next/image";
import Star from "../components/Star";

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

export default function MovieDetail({ movies, genres }) {
	console.log("genresData ===", genres);
	const [css] = useStyletron();
	const moviesData = movies.results;

	const router = useRouter();
	const movieName = router.query.name;

	console.log("query name ///", movieName);

	// console.log("original title ///", moviesData.original_title);
	// console.log("name ///", moviesData.name);
	// console.log("title ///", moviesData.title);

	const filteredMovie = moviesData.filter(
		(movie) => movie.original_title === movieName
	);

	const selectedMovie = filteredMovie[0];

	console.log("// selectedMovie ==", selectedMovie);

	// console.log(selectedMovie.release_date.slice(0, 4));

	console.log("genres ===", genres);

	const movieGenres = selectedMovie.genre_ids.map((id) => {
		const genre = genres.genres.find((g) => g.id === id);
		return genre ? genre.name : "";
	});

	console.log(movieGenres);

	const Container = styled("div", {
		display: "grid",
		gridTemplateColumns: "0.8fr 1.3fr 1.3fr 1.1fr",
		gridTemplateRows: "1fr 1fr 1fr",
		columnGap: "5rem",
	});

	const MovieHeaderContainer = styled("div", {
		display: "flex",
		flexDirection: "column",
		// gridColumnStart: "2",
		width: "436px",
		marginLeft: "auto",
		gridColumn: "1 / span 2",
		// marginRight: "auto",
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

	const Gauge = styled("meter", {});

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
		// width: "436px",
		// height: "240px",
		marginTop: "2rem",
	});

	const MovieOverview = styled("p", {
		fontFamily: "Archivo",
		lineHeight: "24px",
	});

	const PosterContainer = styled("div", {
		// gridColumnStart: "4",
		// gridColumn: "2 / span 3",
	});

	const CastingsContainer = styled("div", {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-between",
		marginTop: "3rem",
	});

	const CastingContainer = styled("div", {
		display: "flex",
		flexDirection: "column",
	});

	return (
		<>
			<Navbar />
			<Container>
				<MovieHeaderContainer>
					<MovieTitle>{selectedMovie.title}</MovieTitle>
					<MovieDate>({selectedMovie.release_date})</MovieDate>
					<MovieSpec>{movieGenres.join(", ")}</MovieSpec>
					<MovieInfoContainer>
						<MovieSpec>2h22</MovieSpec>
						<Gauge
							max={10}
							min={0.0}
							value={selectedMovie.vote_average}
							high={0.75}
							low={0.25}
							optimum={0.8}
						></Gauge>
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
										// borderRadius: "0.5rem",
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
					<CastingsContainer>
						<CastingContainer>
							<SmallTitle>Screenplay, Story</SmallTitle>
							<MovieOverview>Josh Miller</MovieOverview>
							<SmallTitle>Director</SmallTitle>
							<MovieOverview>Jeff Fowler</MovieOverview>
						</CastingContainer>
						<CastingContainer>
							<SmallTitle>Screenplay, Story</SmallTitle>
							<MovieOverview>Patrick Casey</MovieOverview>
							<SmallTitle>Screenplay</SmallTitle>
							<MovieOverview>John Whittington</MovieOverview>
						</CastingContainer>
					</CastingsContainer>
				</MovieHeaderContainer>
				<PosterContainer>
					<Image
						src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
						alt='Poster image'
						height={654}
						width={436}
						className={css({
							borderRadius: "0.25rem",
						})}
					/>
				</PosterContainer>
			</Container>
		</>
	);
}
