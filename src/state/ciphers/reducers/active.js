import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = [];

const removeCipher = (state, cipher) => {
    const cipherIndex = state.indexOf(cipher);
    if (cipherIndex > -1) {
        return [
            ...state.slice(0, cipherIndex),
            ...state.slice(cipherIndex + 1)
        ];
    }
};

const reductionLookup = {
    [EventTypes.AddCipher]: (state, cipher) => ([...state, cipher]),
    [EventTypes.UpdateCipher]: (state, { cipher, update }) => {
        const cipherIndex = state.indexOf(cipher);
        if (cipherIndex > -1) {
            return [
                ...state.slice(0, cipherIndex),
                update,
                ...state.slice(cipherIndex + 1)
            ];
        }
    },
    [EventTypes.CompleteCipher]: removeCipher,
    [EventTypes.CancelCipher]: removeCipher,
};

export default genericReducer(initialState, reductionLookup);
