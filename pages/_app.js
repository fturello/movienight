import React from "react";
import { Provider as StyletronProvider } from "styletron-react";
import { styletron } from "../styletron";
import { LightTheme, BaseProvider } from "baseui";

import "../app.css";

export default function App({ Component, pageProps }) {
	return (
		<StyletronProvider value={styletron}>
			<BaseProvider theme={LightTheme}>
				<Component {...pageProps} />
			</BaseProvider>
		</StyletronProvider>
	);
}
