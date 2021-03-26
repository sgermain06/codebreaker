import {buildEvents, singleParameter} from '../../_common/events/create';

const definition = {
    SetCpuType: singleParameter,
    SetCpuSpeed: singleParameter,
    SetCpuCores: singleParameter,
    SetGraphicsClock: singleParameter,
    SetGraphicsMemory: singleParameter,
    SetPowerSupplyType: singleParameter,
    SetPowerSupplyWattage: singleParameter,
    SetRamType: singleParameter,
    SetRamSize: singleParameter,
    SetStorageType: singleParameter,
    SetStorageSize: singleParameter,
};

const {types, events} = buildEvents('events', definition);

export {types};

export default events;