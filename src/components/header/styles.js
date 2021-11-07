export default function styles(theme) {
    return {
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: theme.palette.primary.main,
        },
        spacer: {
            flexGrow: 1,
        },
        title: {
            display: "block",
        },
    };
}
