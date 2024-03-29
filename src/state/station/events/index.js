import {buildEvents, singleParameter, multipleParameters} from '../../_common/events/create';

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
    SetStorageUsed: singleParameter,
    SetBroadbandType: singleParameter,
    SetBroadbandSpeed: singleParameter,
    UseCpuCores: singleParameter,
    AddCpuLoad: multipleParameters,
    AddNetworkActivity: singleParameter,
    AddPowerConsumption: singleParameter,
};

const {types, events} = buildEvents('station', definition);

export {types};

export default events;