import Events from '../events';
import isEmpty from 'lodash/isEmpty';

import { dataSizeFromSuffix, dataSizeSuffix } from '../../../lib/utils';

import fromState from '../../selectors';
import Commands from '../../commands';

const returnObj = {
    // Add cipher check list:
    addCipher: cipher => (dispatch, getState) => {
        const cipherSize = dataSizeFromSuffix(cipher.type.block) * cipher.blocks;
        const hasEnoughAvailableStorage = fromState.Station.hasEnoughAvailableStorage(cipherSize)(getState());
        const availableStorage = fromState.Station.availableStorage()(getState());
        if (!hasEnoughAvailableStorage) {
            return dispatch(Commands.Player.addNotification({
                message: `Not enough storage. Required: ${dataSizeSuffix(cipherSize)}, Available ${dataSizeSuffix(availableStorage)}`,
                level: 'error'
            }));
    
        }
        else {
            dispatch(Commands.Station.useStorage(cipherSize));
            dispatch(Commands.Player.addNotification({
                message: `Adding Cipher with ID ${cipher.id}`,
                level: 'success'
            }));
            return dispatch(Events.AddCipher(cipher));
        }
    },
    updateCipher: (cipher, prop) => dispatch => {
        const update = {
            ...cipher,
            ...prop
        };
        return dispatch(Events.UpdateCipher(cipher, update));
    },
    completeCipher: cipher => dispatch => {
        if (!isEmpty(cipher)) {
            const message = `Completed Cipher with ID ${cipher.id}`;
            dispatch(Commands.Player.addNotification({
                message,
                level: 'success'
            }));
            dispatch(Commands.Player.receiveCurrency(cipher.blocks * cipher.payoutPerBlock));
            return dispatch(Events.CompleteCipher(cipher));
        }
        else {
            throw new Error('Cipher is empty');
        }
    },
    cancelCipher: cipher => dispatch => {
        if (!isEmpty(cipher)) {
            const message = `Canceled Cipher with ID ${cipher.id}`;
            dispatch(Commands.Player.addNotification({
                message,
                level: 'warning'
            }));
            return dispatch(Events.CancelCipher(cipher))
        }
        else {
            throw new Error('Cipher is empty');
        }
    },
    setCharacterGrid: characterGrid => dispatch => dispatch(Events.SetCharacterGrid(characterGrid)),
    setGridClasses: gridClasses => dispatch => dispatch(Events.SetGridClasses(gridClasses)),
    addBrokenGridCell: cell => dispatch => dispatch(Events.AddBrokenGridCell(cell)),
    resetGrid: () => dispatch => dispatch(Events.ResetGrid()),
};

export default returnObj;