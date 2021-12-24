import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Commands from '../../../../state/commands';
import Component from './component';

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
    get: path => dispatch(Commands.API.get(path)),
    post: (path, body) => dispatch(Commands.API.post(path, body)),
    put: (path, body) => dispatch(Commands.API.put(path, body)),
    enqueueSnackbar: (message, options) => dispatch(Commands.Snackbar.enqueueSnackbar(message, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));