import Events from '../events';
import isEmpty from 'lodash/isEmpty';

import Commands from '../../commands';

const returnObj = {
    addCipher: cipher => dispatch => {
        const message = `Adding Cipher with ID ${cipher.id}`
        dispatch(Commands.Player.addNotification({
            message,
            level: 'success'
        }));
        dispatch(Commands.Snackbar.enqueueSnackbar(message, { variant: 'success' }));
        return dispatch(Events.AddCipher(cipher));
    },
    updateCipher: (cipher, update) => dispatch => dispatch(Events.UpdateCipher(cipher, update)),
    completeCipher: cipher => dispatch => {
        if (!isEmpty(cipher)) {
            const message = `Completed Cipher with ID ${cipher.id}`;
            dispatch(Commands.Player.addNotification({
                message,
                level: 'success'
            }));
            dispatch(Commands.Snackbar.enqueueSnackbar(message, { variant: 'success' }));
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
            dispatch(Commands.Snackbar.enqueueSnackbar(message, { variant: 'warning' }));
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