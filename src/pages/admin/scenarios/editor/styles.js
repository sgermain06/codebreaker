export default function styles(theme) {
    return {
        root: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
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
        title: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            marginBottom: theme.spacing(1),
            '& .Mui-focused': {
                color: 'white'
            },
            '& :after': {
                borderColor: 'white !important',
            },
            '& .Mui-focused fieldset': {
                borderColor: 'white !important'
            }
        },
    };
}
