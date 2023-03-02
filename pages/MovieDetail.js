import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { styled } from "styletron-react";

export const getStaticProps = async () => {
	const res = await fetch(
		"https://api.themoviedb.org/3/trending/all/day?api_key=8420bcf29704942b5b368531eaf1945a"
	);
	const data = await res.json();

	return {
		props: { movies: data },
	};
};

export default function MovieDetail({ movies }) {
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

	const Container = styled("div", {
		display: "grid",
		gridTemplateColumns: "0.5fr 2.2fr 0.5fr",
		gridTemplateRows: "1fr 1fr 1fr",
	});

	const MovieHeaderContainer = styled("div", {
		display: "flex",
	});

	const MovieTitle = styled("h1", {
		fontFamily: "Archivo Black",
		fontSize: "2.75rem",
	});

	return (
		<>
			<Navbar />
			<Container>
				<div>
					<MovieTitle>{selectedMovie.title}</MovieTitle>
				</div>
			</Container>
		</>
	);
}
