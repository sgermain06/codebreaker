export default function styles(theme) {
    return {
        centered: {
            textAlign: 'center',
        },
        textField: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
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
