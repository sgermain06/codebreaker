import { connect } from 'react-redux';

import fromState from '../../../state/selectors';
import Commands from '../../../state/commands';

import Component from './component';

const mapStateToProps = (state) => ({
    brokenGrid: fromState.Ciphers.getBrokenGrid()(state),
    characterGrid: fromState.Ciphers.getCharacterGrid()(state),
    gridClasses: fromState.Ciphers.getGridClasses()(state),
    activeCipher: fromState.Ciphers.getActive()(state)[0] || {},
});

const mapDispatchToProps = (dispatch) => ({
    resetGrid: () => dispatch(Commands.Ciphers.resetGrid()),
    addBrokenGridCell: cell => dispatch(Commands.Ciphers.addBrokenGridCell(cell)),
    setCharacterGrid: charactersArary => dispatch(Commands.Ciphers.setCharacterGrid(charactersArary)),
    setGridClasses: gridClasses => dispatch(Commands.Ciphers.setGridClasses(gridClasses)),
    completeCipher: cipher => () => dispatch(Commands.Ciphers.completeCipher(cipher)),
    cancelCipher: cipher => () => dispatch(Commands.Ciphers.cancelCipher(cipher)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    completeCipher: dispatchProps.completeCipher(stateProps.activeCipher),
    cancelCipher: dispatchProps.cancelCipher(stateProps.activeCipher),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Component);