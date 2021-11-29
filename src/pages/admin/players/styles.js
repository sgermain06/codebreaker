export default function styles(theme) {
    return {
        centered: {
            textAlign: 'center',
        },
        searchBox: {
            display: 'flex',
            flexDirection: 'row',
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
