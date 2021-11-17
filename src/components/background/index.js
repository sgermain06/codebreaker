import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Component from './component';

const mapStateToProps = state => ({
    router: state.router,
});

export default connect(mapStateToProps)(withRouter(Component));