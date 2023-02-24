import { styled } from "styletron-react";

export default function Navbar() {
	const Brand = styled("a", {
		color: "red",
		fontFamily: "Archivo Narrow",
		fontSize: "32px",
		textDecoration: "none",
	});

	return (
		<>
			<Brand href='/'>MOVIENIGHT</Brand>
		</>
	);
}
