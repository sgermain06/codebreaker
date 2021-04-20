import common from '../../_common/selectors/_common';

const resolutions = [
    '640x480',
    '800x600',
    '1024x768',
    '1280x1024',
    '1440x900',
    '2K',
    '4K',
    '8K'
];

export const storageSpeeds = ["HDD 4800", "HDD 5400", "HDD 7200", "HDD 10000", "HDD 15000"];

export const broadbandTypes = [
    {
        type: 'DSL',
        provider: 'BU&U',
    },
    {
        type: 'DOCSIS',
        provider: 'Codecast',
    },
    {
        type: 'Fiber Optic',
        provider: 'Foogle Fiber',
    },
    {
        type: 'Dedicated Ethernet',
        provider: 'Level4'
    },
];

export default common.bindToReducer('station', {
    broadband: common.get('broadband'),
    broadbandType: common.get('broadband.type'),
    broadbandTypeDescription: () => (state) => broadbandTypes[state.broadband.type].type,
    broadbandProvider: () => (state) => broadbandTypes[state.broadband.type].provider,
    broadbandSpeed: common.get('broadband.speed'),
    cpu: common.get('cpu'),
    cpuType: common.get('cpu.type'),
    cpuSpeed: common.get('cpu.speed'),
    cpuCores: common.get('cpu.cores'),
    graphics: common.get('graphics'),
    graphicsClock: common.get('graphics.clock'),
    graphicsMemory: common.get('graphics.memory'),
    powerSupply: common.get('powerSupply'),
    powerSupplyWattage: common.get('powerSupply.wattage'),
    powerSupplyType: common.get('powerSupply.type'),
    ram: common.get('ram'),
    ramSize: common.get('ram.size'),
    ramType: common.get('ram.type'),
    storage: common.get('storage'),
    storageSize: common.get('storage.size'),
    storageType: common.get('storage.type'),
    storageTypeSpeed: () => (state) => storageSpeeds[state.storage.type],
});