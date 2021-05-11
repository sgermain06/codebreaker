import Events from '../events';

const returnObj = {
    addCipher: cipher => dispatch => dispatch(Events.AddCipher(cipher)),
    updateCipher: (cipher, update) => dispatch => dispatch(Events.UpdateCipher(cipher, update)),
    completeCipher: cipher => dispatch => dispatch(Events.CompleteCipher(cipher)),
    cancelCipher: cipher => dispatch => dispatch(Events.CancelCipher(cipher)),
};

export default returnObj;