export default function styles(theme) {
    return {
        root: {
            margin: theme.spacing(2),
        },
        header: {
            paddingBottom: '0px !important',
            textAlign: 'center',
        },
        content: {
            margin: `${theme.spacing(1)} 0`,
            display: 'flex',
            flexDirection: 'column',
        },
        centered: {
            justifyContent: 'center',
        },
        checkbox: {
            color: 'white',
            '&.Mui-checked': {
                color: 'white',
            }
        },
    };
}
