export default function styles(theme) {
    return {
        root: {
            margin: theme.spacing(2),
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
        },
        header: {
            paddingBottom: '0px !important',
            textAlign: 'center',
        },
        container: {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
        },
        content: {
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
        },
        mainContainer: {
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
        },
        sidebar: {
            height: '100%',
        },
        mainContent: {
            marginLeft: theme.spacing(2),
            flexGrow: 1,
            height: '100%',
        },
    };
}
