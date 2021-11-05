import Events from '../events';
const uuid = require('uuid').v4;

const returnObj = {
    enqueueSnackbar: (message, options) => dispatch => dispatch(Events.EnqueueSnackbar(uuid(), { message, options })),
    closeSnackbar: ({ key, dismissAll }) => dispatch => dispatch(Events.CloseSnackbar(key, dismissAll)),
    removeSnackbar: key => dispatch => dispatch(Events.RemoveSnackbar(key)),
    resetNotifications: () => dispatch => {
        dispatch(Events.CloseSnackbar());
        dispatch(Events.ResetNotifications())
    },
};

export default returnObj;