import React from "react";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './state';

import { SnackbarProvider } from 'notistack';

import Toolbar from "@material-ui/core/Toolbar";

import Header from "./components/header";
import SideBar from "./components/sidebar";
import Footer from "./components/footer";

import Main from "./pages/main";

import GameController from "./lib/game";

const { store, persistor } = configureStore();

if (window.location.search === '?purge') {
    persistor.purge().then(() => console.log('Done purging!'));
}

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
        display: 'flex',
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
                    background: {
                        paper: 'rgba(66, 66, 66, 0.85)',
                    }
                },
            }),
        [prefersDarkMode]
    );

    return (
        <div className={classes.root}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <HashRouter>
                        <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
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
                        </SnackbarProvider>
                    </HashRouter>
                </PersistGate>
            </Provider>
        </div>
    );
}
