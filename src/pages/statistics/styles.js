import background from '../../assets/statistics_bg.png';

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
    };
};