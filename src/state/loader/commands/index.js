import Events from '../events';

export default ({
    startLoading: () => dispatch => dispatch(Events.Loading(true)),
    stopLoading: () => dispatch => dispatch(Events.Loading(false)),
});