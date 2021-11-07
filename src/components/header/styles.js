export default function styles(theme) {
    return {
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        spacer: {
            flexGrow: 1,
        },
        title: {
            display: "block",
        },
    };
}
