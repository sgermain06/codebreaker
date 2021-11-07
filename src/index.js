import React from "react";
import ReactDOM from "react-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, StyledEngineProvider, createTheme, adaptV4Theme } from "@mui/material/styles";

import Layout from './layout';

import "./index.css";

function Main() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const theme = React.useMemo(
        () =>
            createTheme(adaptV4Theme({
                palette: {
                    mode: prefersDarkMode ? "dark" : "light",
                    background: {
                        paper: 'rgba(66, 66, 66, 0.85)',
                    }
                },
            })),
        [prefersDarkMode]
    );
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Layout />
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

ReactDOM.render(<Main />, document.getElementById("root"));
