export default function styles(theme) {
    const drawerWidth = 240;

    return {
        listItem: {
            '&.Mui-selected': {
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)',
            },
            '&.Mui-selected:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)',
            }
        },
        drawer: {
            width: drawerWidth,
            height: "100vh",
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
            background: 'rgba(66, 66, 66, 1)'
        },
        drawerContainer: {
            overflow: "auto",
            height: '100%',
            minWidth: '220px',
        },
    };
}
