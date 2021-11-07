import background from '../../assets/dark_web_bg.png';

export default function styles(theme) {
    return {
        container: {
            padding: theme.spacing(2),
            textAlign: 'center',
            background: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${background})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100%',
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