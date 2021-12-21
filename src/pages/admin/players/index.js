import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'connected-react-router';

import Component from './component';

import Commands from '../../../state/commands';

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
    navigateTo: (id = 'new') => dispatch(push(`/admin/players/${id}`)),
    disablePlayer: id => { console.log(`Disabling ${id}`)},
    get: async path => dispatch(Commands.API.get(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));