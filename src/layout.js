import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import makeStyles from '@mui/styles/makeStyles';
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './state';

import { SnackbarProvider } from 'notistack';

import Toolbar from "@mui/material/Toolbar";

import Header from "./components/header";
import SideBar from "./components/sidebar";
import Footer from "./components/footer";
import CodeBreaker from './components/codeBreaker';
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

    return (
        <div className={classes.root}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <HashRouter>
                        <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                            <CssBaseline />
                            <Header gameController={gameController} persistor={persistor} />
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
                            <CodeBreaker gameController={gameController} />
                        </SnackbarProvider>
                    </HashRouter>
                </PersistGate>
            </Provider>
        </div>
    );
}
