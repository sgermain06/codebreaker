export default function styles(theme) {
    const drawerWidth = 240;

    return {
        drawer: {
            width: drawerWidth,
            height: "100vh",
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: "auto",
            height: '100%',
        },
    };
}
