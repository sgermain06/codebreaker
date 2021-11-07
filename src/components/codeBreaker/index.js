import { useEffect } from 'react';
import * as PropTypes from 'prop-types';

import { connect } from 'react-redux';

import fromState from '../../state/selectors';
import Commands from '../../state/commands';

const mapStateToProps = state => ({
    activeCipher: fromState.Ciphers.getCurrentCipher()(state),
});

const mapDispatchToProps = dispatch => ({
    completeCipher: cipher => () => dispatch(Commands.Ciphers.completeCipher(cipher)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    completeCipher: dispatchProps.completeCipher(stateProps.activeCipher),
});

function CodeBreaker(props) {

    useEffect(() => {

        const {
            activeCipher,
            completeCipher,
            gameController,
        } = props;
    
        console.log(activeCipher);

        const update = {
            id: 'codeBreaker',
            callback: (frames, count, exponent) => {
                // This is where we calculate the parameters for breaking the cipher.
                // The algorithm is described in the /lib/cipher.js file.
            }
        };

        gameController.addProcess(update);
    }, [props]);

    return null;
}

CodeBreaker.propTypes = {
    gameController: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CodeBreaker);