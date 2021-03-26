export default function styles(theme) {
    return {
        container: {
            padding: theme.spacing(2),
            textAlign: 'center'
        },
        button: {
            margin: 8,
            color: '#fff',
            backgroundColor: '#313131',
        },
        success: {
            backgroundColor: '#43a047',
        },
        error: {
            backgroundColor: '#d32f2f',
        },
        info: {
            backgroundColor: '#2979ff',
        },
        warning: {
            backgroundColor: '#ffa000',
        },
    };
};