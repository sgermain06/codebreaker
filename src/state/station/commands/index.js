import Events from '../events';

import { broadbandTypes,storageSpeeds } from '../selectors';

import fromState from '../../selectors';

const returnObj = {
    increaseCpuSpeed: () => (dispatch, getState) => {
        const currentSpeed = fromState.Station.cpuSpeed()(getState());
        dispatch(Events.SetCpuSpeed(Number((currentSpeed + 0.1).toFixed(2))));
    },
    resetCpuSpeed: () => dispatch => {
        dispatch(Events.SetCpuSpeed(1));
    },
    increaseCpuCores: () => (dispatch, getState) => {
        const currentCores = fromState.Station.cpuCores()(getState());
        dispatch(Events.SetCpuCores(currentCores + 1));
    },
    resetCpuCores: () => dispatch => {
        dispatch(Events.SetCpuCores(1));
    },
    increaseBroadbandSpeed: () => (dispatch, getState) => {
        const currentBroadbandSpeed = fromState.Station.broadbandSpeed()(getState());
        dispatch(Events.SetBroadbandSpeed(Number((currentBroadbandSpeed + 1).toFixed(2))));
    },
    resetBroadbandSpeed: () => dispatch => {
        dispatch(Events.SetBroadbandSpeed(1));
    },
    increaseBroadbandType: () => (dispatch, getState) => {
        const currentBroadbandType = fromState.Station.broadbandType()(getState());
        if (currentBroadbandType < broadbandTypes.length - 1) {
            dispatch(Events.SetBroadbandType(Number(currentBroadbandType + 1)));
        }
    },
    resetBroadbandType: () => dispatch => {
        dispatch(Events.SetBroadbandType(0));
    },

    increaseStorageSize: () => (dispatch, getState) => {
        const currentStorageSize = fromState.Station.storageSize()(getState());
        dispatch(Events.SetStorageSize(Number(currentStorageSize * 2 )));
    },

    resetStorageSize: () => dispatch => {
        dispatch(Events.SetStorageSize(2));
    },

    increaseStorageType: () => (dispatch,getState) => {
        const currentStorageType = fromState.Station.storageType()(getState());
        if (currentStorageType < storageSpeeds.length - 1) {
            dispatch(Events.SetStorageType(currentStorageType + 1));
        }
    },

    resetStorageType: () => dispatch => {
        dispatch(Events.SetStorageType(0));
    },
};

export default returnObj;