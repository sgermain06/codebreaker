import { connect } from 'react-redux';
import { withRouter } from "react-router";

import Component from './component';

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));
