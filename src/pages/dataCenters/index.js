import { withRouter } from "react-router";
import { connect } from 'react-redux';
import Component from './component';

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

const component = withRouter(Component);

export default connect(mapStateToProps, mapDispatchToProps)(component);