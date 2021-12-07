export default function styles(theme) {
    return {
        root: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
        },
        sidebar: {
            height: '100%',
            minWidth: '200px',
        },
        editor: {
            width: '100%',
            height: '100%',
            flexGrow: 1,
        },
    };
}
