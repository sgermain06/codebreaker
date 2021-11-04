import { connect } from 'react-redux';

import fromState from '../../../state/selectors';
import Commands from '../../../state/commands';

import { generateCipher } from '../../../lib/ciphers';

import Component from './component';

const mapStateToProps = state => ({
    active: fromState.Ciphers.getActive()(state),
    completed: fromState.Ciphers.getCompleted()(state),
    canceled: fromState.Ciphers.getCanceled()(state),
});

const mapDispatchToProps = dispatch => ({
    addCipher: () => dispatch(Commands.Ciphers.addCipher(generateCipher(1))),
    completeCipher: cipher => dispatch(Commands.Ciphers.completeCipher(cipher)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);