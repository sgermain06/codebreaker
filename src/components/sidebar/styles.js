export default function styles(theme) {
    const drawerWidth = 240;

    return {
        drawer: {
            width: drawerWidth,
            height: "100vh",
            flexShring: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: "auto",
        },
    };
}
