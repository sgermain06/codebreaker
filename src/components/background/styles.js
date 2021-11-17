export default function styles(theme) {
    return {
        container: (props) => ({
            position: 'absolute',
            height: '100%',
            backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('${props.background}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            width: '100%',
            zIndex: -1,
        }),
    };
};