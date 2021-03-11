import React from "react";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { HashRouter } from "react-router-dom";

import Toolbar from "@material-ui/core/Toolbar";

import Header from "./components/header";
import SideBar from "./components/sidebar";
import Footer from "./components/footer";

import Main from "./pages/main";

import GameController from "./lib/game";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        height: "100%",
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100%",
    },
    mainContent: {
        flexShrink: 1,
        flexGrow: 1,
        flexBasis: "auto",
    },
    box: {
        display: "flex",
        height: "100%",
        flexFlow: "column",
    },
}));

const gameController = new GameController();

export default function Layout() {
    const classes = useStyles();

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? "dark" : "light",
                },
            }),
        [prefersDarkMode]
    );

    return (
        <div className={classes.root}>
            <HashRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Header gameController={gameController} />
                    <SideBar />
                    <main className={classes.content}>
                        <div className={classes.box}>
                            <Toolbar />
                            <div className={classes.mainContent}>
                                <Main gameController={gameController} />
                            </div>
                            <Footer />
                        </div>
                    </main>
                </ThemeProvider>
            </HashRouter>
        </div>
    );
}
