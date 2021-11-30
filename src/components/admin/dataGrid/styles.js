export default function styles(theme) {
    return {
        centered: {
            textAlign: 'center',
        },
        button: {
            width: '40px',
            height: '40px',
        },
        spacer: {
            flexGrow: 1,
        },
        row: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
        searchBox: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: `${theme.spacing(1)} 0`,
            '& .Mui-focused': {
                color: 'white'
            },
            '& :after': {
                borderColor: 'white !important',
            },
        },
        clearButton: {
            width: theme.spacing(4),
            height: theme.spacing(4),
        }
    };
}
