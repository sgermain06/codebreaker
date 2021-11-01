import { connect } from 'react-redux';

import fromState from '../../../state/selectors';
import Commands from '../../../state/commands';

import CodeBreakingAnimation from './component';

const mapStateToProps = (state) => ({
    brokenGrid: fromState.Ciphers.getBrokenGrid()(state),
    characterGrid: fromState.Ciphers.getCharacterGrid()(state),
});

const mapDispatchToProps = (dispatch) => ({
    resetBrokenGrid: () => dispatch(Commands.Ciphers.resetBrokenGrid()),
    addBrokenGridCell: cell => dispatch(Commands.Ciphers.addBrokenGridCell(cell)),
    setCharacterGrid: charactersArary => dispatch(Commands.Ciphers.setCharacterGrid(charactersArary)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CodeBreakingAnimation);