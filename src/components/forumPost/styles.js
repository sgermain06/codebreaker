import makeStyles from '@mui/styles/makeStyles';

export default makeStyles(theme => ({
    inline: {
        display: 'inline',
    },
    container: {
        width: '100%',
    },
    list: {
        padding: 0,
    },
    listItem: {
        padding: '20px',
    },
    header: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    icon: {
        display: 'flex',
        padding: '20px',
        alignItems: 'center'
    },
    titleContainer: {
        textAlign: 'left',
        flexGrow: 1,
        padding: '20px',
    },
    title: {
        fontSize: '1.2rem',
    },
    actions: {
        display: 'flex',
        padding: '20px',
        alignItems: 'center'
    }
}));