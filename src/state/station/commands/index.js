import Events from '../events';

import { broadbandTypes, storageSpeeds } from '../selectors';

import fromState from '../../selectors';

const returnObj = {
    // Resets
    resetCpuSpeed: () => dispatch => dispatch(Events.SetCpuSpeed(1)),
    resetCpuCores: () => dispatch => dispatch(Events.SetCpuCores(1)),
    resetRamSize: () => dispatch => dispatch(Events.SetRamSize(2)),
    resetRamType: () => dispatch => dispatch(Events.SetRamType(1)),
    resetGraphicsMemory: () => dispatch => dispatch(Events.SetGraphicsMemory(1024)),
    resetGraphicsClock: () => dispatch => dispatch(Events.SetGraphicsClock(10)),
    resetBroadbandSpeed: () => dispatch => dispatch(Events.SetBroadbandSpeed(1)),
    resetBroadbandType: () => dispatch => dispatch(Events.SetBroadbandType(0)),
    resetStorageSize: () => dispatch => dispatch(Events.SetStorageSize(2)),
    resetStorageType: () => dispatch => dispatch(Events.SetStorageType(0)),

    // Increases
    increaseCpuSpeed: () => (dispatch, getState) => {
        const currentSpeed = fromState.Station.cpuSpeed()(getState());
        dispatch(Events.SetCpuSpeed(Number((currentSpeed + 0.1).toFixed(2))));
    },
    increaseCpuCores: () => (dispatch, getState) => {
        const currentCores = fromState.Station.cpuCores()(getState());
        dispatch(Events.SetCpuCores(currentCores + 1));
    },
    increaseRamSize: () => (dispatch, getState) => {
        const currentRamSize = fromState.Station.ramSize()(getState());
        dispatch(Events.SetRamSize(currentRamSize * 2));
    },
    increaseRamType: () => (dispatch, getState) => {
        const currentRamType = fromState.Station.ramType()(getState());
        dispatch(Events.SetRamType(Math.min(Number(currentRamType + 1), 6)));
    },
    increaseGraphicsMemory: () => (dispatch, getState) => {
        const currentGraphicsMemory = fromState.Station.graphicsMemory()(getState());
        dispatch(Events.SetGraphicsMemory(currentGraphicsMemory * 2));
    },
    increaseGraphicsClock: () => (dispatch, getState) => {
        const currentGraphicsClock = fromState.Station.graphicsClock()(getState());
        dispatch(Events.SetGraphicsClock(currentGraphicsClock + 10 ));
    },
    increaseBroadbandSpeed: () => (dispatch, getState) => {
        const currentBroadbandSpeed = fromState.Station.broadbandSpeed()(getState());
        dispatch(Events.SetBroadbandSpeed(Number((currentBroadbandSpeed + 1).toFixed(2))));
    },
    increaseBroadbandType: () => (dispatch, getState) => {
        const currentBroadbandType = fromState.Station.broadbandType()(getState());
        dispatch(Events.SetBroadbandType(Math.min(Number(currentBroadbandType + 1), broadbandTypes.length - 1)));
    },
    increaseStorageSize: () => (dispatch, getState) => {
        const currentStorageSize = fromState.Station.storageSize()(getState());
        dispatch(Events.SetStorageSize(Number(currentStorageSize * 2 )));
    },
    increaseStorageType: () => (dispatch, getState) => {
        const currentStorageType = fromState.Station.storageType()(getState());
        dispatch(Events.SetStorageType(Math.min(Number(currentStorageType + 1), storageSpeeds.length - 1)));
    },

    // Other
    useCpuCores: cores => (dispatch, getState) => {
        if (fromState.Station.hasEnoughAvailableCpuCores(cores)(getState())) {
            dispatch(Events.UseCpuCores(cores));
        }
        else {
            const availableCores = fromState.Station.availableCores()(getState());
            throw new Error(`Not enough available CPU cores: ${cores}. Available: ${availableCores}`);
        }
    },
    addCpuLoad: load => dispatch => dispatch(Events.AddCpuLoad(load)),

    useStorage: size => (dispatch, getState) => {
        if (fromState.Station.hasEnoughAvailableStorage(size)(getState())) {
            dispatch(Events.SetStorageUsed(fromState.Station.storageUsed()(getState()) + size));
        }
        else {
            const availableStorage = fromState.Station.availableStorage()(getState());
            throw new Error(`Not enough available storage: ${size}. Available: ${availableStorage}`);
        }
    },
};

export default returnObj;