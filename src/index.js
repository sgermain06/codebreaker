import React from "react";
import ReactDOM from "react-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material/styles";

import Layout from './layout';

import "./index.css";
import { indigo, red } from "@mui/material/colors";

function Main() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? "dark" : "light",
                    background: {
                        paper: 'rgba(66, 66, 66, 0.85)',
                    },
                    primary: {
                        main: indigo[800]
                    },
                    secondary: {
                        main: red[500],
                    }
                }
            }),
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
