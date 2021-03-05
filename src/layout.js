import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';

import Header from './components/header';
import SideBar from './components/sidebar';

import App from './App';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100%',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100%',
    },
    mainContent: {
        flexShrink: 1,
        flexGrow: 1,
        flexBasis: 'auto',
    },
    box: {
        display: 'flex',
        height: '100%',
        flexFlow: 'column',
    },
    footer: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: '40px',
        paddingTop: theme.spacing(1),
    }
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Layout() {
    const classes = useStyles();

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
      () =>
        createMuiTheme({
          palette: {
            type: prefersDarkMode ? 'dark' : 'light',
          },
        }),
      [prefersDarkMode],
    );

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <SideBar />
                <main className={classes.content}>
                    <div className={classes.box}>
                        <Toolbar />
                        <div className={classes.mainContent}>
                            <App />
                        </div>
                        <div className={classes.footer}>
                            <Copyright />
                        </div>
                    </div>
                </main>
            </ThemeProvider>
        </div>
    );
}