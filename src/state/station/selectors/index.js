import { dataSizeFromSuffix, dataSizeSuffixes } from '../../../lib/utils';
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
        avgUptime: 0.8,
        speeds: [
            {
                bitrate: 30720000,
                name: '3 Mbps',
            },
            {
                bitrate: 61440000,
                name: '6 Mbps',
            },
            {
                bitrate: 102400000,
                name: '10 Mbps',
            },
            {
                bitrate: 204800000,
                name: '20 Mbps',
            },
        ],
    },
    {
        type: 'DOCSIS',
        provider: 'Codecast',
        avgUptime: 0.85,
        speeds: [
            {
                bitrate: 307200000,
                name: '30 Mbps',
            },
            {
                bitrate: 768000000,
                name: '75 Mbps',
            },
            {
                bitrate: 15360000000,
                name: '150 Mbps',
            },
            {
                bitrate: 51200000000,
                name: '500 Mbps',
            },
        ],
    },
    {
        type: 'Fiber Optic',
        provider: 'Foogle Fiber',
        avgUptime: 0.94,
        speeds: [
            {
                bitrate: 25600000000,
                name: '250 Mbps',
            },
            {
                bitrate: 51200000000,
                name: '500 Mbps',
            },
            {
                bitrate: 102400000000,
                name: '1 Gbps',
            },
            {
                bitrate: 204800000000,
                name: '2 Gbps',
            },
        ],
    },
    {
        type: 'Dedicated Ethernet',
        provider: 'Level4',
        avgUptime: 0.99,
        speeds: [
            {
                bitrate: 102400000000,
                name: '1 Gbps',
            },
            {
                bitrate: 204800000000,
                name: '2 Gbps',
            },
            {
                bitrate: 409600000000,
                name: '4 Gbps',
            },
            {
                bitrate: 1024000000000,
                name: '10 Gbps',
            },
        ],
    },
];

export default common.bindToReducer('station', {
    broadband: common.get('broadband'),
    broadbandType: common.get('broadband.type'),
    broadbandTypeDescription: () => (state) => broadbandTypes[state.broadband.type].type,
    broadbandProvider: () => (state) => broadbandTypes[state.broadband.type].provider,
    broadbandReliability: () => state => broadbandTypes[state.broadband.type].avgUptime,
    broadbandSpeed: () => state => broadbandTypes[state.broadband.type].speeds[state.broadband.speed],
    cpu: common.get('cpu'),
    cpuType: common.get('cpu.type'),
    cpuSpeed: common.get('cpu.speed'),
    cpuCores: common.get('cpu.cores'),
    usedCpuCores: common.get('cpu.usedCores'),
    availableCpuCores: () => (state) => state.cpu.cores - state.cpu.usedCores,
    hasEnoughAvailableCpuCores: cores => (state) => (state.cpu.cores - state.cpu.usedCores) >= cores,
    cpuLoad: common.get('cpu.load'),
    display: common.get('display'),
    displayResolution: resolutions[common.get('display.resolution')],
    displayType: common.get('display.type'),
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
    storageUsed: common.get('storage.used'),
    availableStorage: () => (state) => {
        const size = state.storage.size;
        const unit = dataSizeSuffixes[state.storage.dataSuffixOffset]
        return dataSizeFromSuffix({size, unit}) - state.storage.used;
    },
    storageTypeSpeed: () => (state) => storageSpeeds[state.storage.type],
    hasEnoughAvailableStorage: requestedSize => (state) => {
        const size = state.storage.size;
        const unit = dataSizeSuffixes[state.storage.dataSuffixOffset]
        const total = dataSizeFromSuffix({size, unit});
        return total - state.storage.used >= requestedSize;
    },
});