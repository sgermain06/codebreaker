export default function styles(theme) {
    return {
        thumbnail: (props) => ({
            height: '100%',
            backgroundImage: `url('${props.serverImage}')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',
        }),
        topGrid: {
            paddingTop: '0 !important',
        },
        logo: (props) => ({
            width: '40px',
            height: '40px',
            backgroundColor: '#ccc',
            borderRadius: '20px',
            backgroundImage: `url('${props.logo}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        })
    };
};