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
    useCpuCores: cores => (dispatch, getState) => {
        if (fromState.Station.hasEnoughAvailableCpuCores(cores)(getState())) {
            dispatch(Events.UseCpuCores(cores));
        }
        else {
            const availableCores = fromState.Station.availableCores()(getState());
            throw new Error(`Not enough available CPU cores: ${cores}. Available: ${availableCores}`);
        }
    },
    increaseRamSize: () => (dispatch, getState) => {
        const currentRamSize = fromState.Station.ramSize()(getState());
        dispatch(Events.SetRamSize(currentRamSize * 2));
    },
    resetRamSize: () => dispatch => {
        dispatch(Events.SetRamSize(2));
    },
    increaseRamType: () => (dispatch, getState) => {
        const currentRamType = fromState.Station.ramType()(getState());
        if (currentRamType < 6) {
            dispatch(Events.SetRamType(currentRamType + 1));
        }
    },
    resetRamType: () => dispatch => {
        dispatch(Events.SetRamType(1));
    },
    increaseGraphicsMemory: () => (dispatch, getState) => {
        const currentGraphicsMemory = fromState.Station.graphicsMemory()(getState());
        dispatch(Events.SetGraphicsMemory(currentGraphicsMemory * 2));
    },
    resetGraphicsMemory: () => dispatch => {
        dispatch(Events.SetGraphicsMemory(1024));
    },
    increaseGraphicsClock: () => (dispatch, getState) => {
        const currentGraphicsClock = fromState.Station.graphicsClock()(getState());
        dispatch(Events.SetGraphicsClock(currentGraphicsClock + 10 ));
    },
    resetGraphicsClock: () => dispatch => {
        dispatch(Events.SetGraphicsClock(10));
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