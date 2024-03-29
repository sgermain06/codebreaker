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
        searchBox: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: `${theme.spacing(1)} 0`,
            '& .Mui-focused': {
                color: 'white'
            },
            '& .Mui-focused fieldset': {
                borderColor: 'white !important'
            }
        },
    };
}
