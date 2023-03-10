import { useState } from "react";
import { styled } from "styletron-react";
import { Input } from "baseui/input";
import { Search } from "baseui/icon";

const Container = styled("div", {
	display: "flex",
	justifyContent: "space-between",
	marginTop: "1.5rem",
	marginBottom: "1.5rem",
	marginLeft: "auto",
	marginRight: "auto",
	width: "1200px",
});

const Brand = styled("a", {
	fontFamily: "Archivo Narrow",
	fontSize: "2rem",
	fontWeight: 700,
	textDecoration: "none",
	textTransform: "uppercase",
	color: "inherit",
});

export default function Navbar(props) {
	const [searchTerm, setSearchTerm] = useState("");

	const handleInputChange = (event) => {
		const value = event.target.value;
		setSearchTerm(value);
		props.onSearch(value);
	};

	return (
		<Container>
			<Brand href='/'>movienight</Brand>
			<Input
				startEnhancer={<Search size='30px' />}
				placeholder='Rechercher un film, un réalisteur, un acteur'
				value={searchTerm}
				onChange={handleInputChange}
				overrides={{
					Root: {
						style: {
							width: "32rem",
						},
					},
					Input: {
						style: {
							fontFamily: "Archivo",
						},
					},
				}}
			/>
		</Container>
	);
}
