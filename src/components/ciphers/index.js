// We can add as much as we want
/*

    Definitions:
    name: Well, the name of the cipher algorithm
    block: Size of one block to process, in size and unit. Performance will be affected by RAM
    complexity: Rate at which the CPU will require cycles to break a block
    parallelism: Determines how many blocks can be run in parallel.

    If a station has a 1 GHz CPU with 2 cores, with 2 GB RAM, having to process 1000 blocks of polymorphic cipher:
    - Requires 128MB RAM minimum to break. If machine has less RAM, breaking will fail.
    - Will take 21 CPU cycle per step. At 1 GHz, you could run complexity * steps (21 * 100), would take 2.1 seconds to break a block.
    - The machine has 2 cores so, parallelism is higher than the nubmer of cores, meaning all cores can be utilized. The CPU will be able to break nbCores blocks per cycle.
    
    So, every 2.1 seconds, this machine will break 2 blocks.

    If a station has a 3 GHz CPU with 12 cores, with 96 GB RAM, having to process 1000 blocks of polymorphic cipher:
    - Requires 128MB RAM minimum to break. We're good here.
    - Will take 21 CPU cycles per step. At 3 GHz, you could run complexity * steps (21 * 100), divide it by the core GHz ((21 * 100) / 3), would take 0.7 seconds to break a block.
    - The machine has 12 cores, so parallelism is lower than the numbe of cores, meaning up to 4 cores can be utilized. The CPU will be able to break parallelism blocks per cycle.

    So, every 0.7 seconds, this machine will break 4 blocks.

    Need some thought:
    - Insert some element of luck here, possibility for deciphering a block could fail?
    - Add a retry mechanism for failed deciphering?
    - When retries are exhausted, deciphering fails, mission fails.

    How to process a cipher:
    - Download the encrypted code.
    - Make sure you have enough disk space for it.
    - Store to disk.
    - Evaluate cipher parallelism and available CPU cores.
    - Make sure there is enough RAM available for a block.
    - Transfer cipher block from disk to RAM. Hard drive speed and memory speed have an impact here.
    - Refer to processing steps.
    - If failed, break the loop, notify of failure.
    - Transfer deciphered block from RAM to disk. Hard drive speed and memory speed have an impact here.
    - Go to step 4 until last block.
    - Notify that encrypted code break was successful.

*/
const cipherTypes = [
    {
        name: 'polymorphic',
        block: {
            size: 128,
            unit: 'MB'
        },
        steps: 100,
        complexity: 21,
        parallelism: 4,
    },
    {
        name: 'elliptical',
        block: {
            size: 4,
            unit: 'MB'
        },
        complexity: 6,
        parallelism: 1,
    },
    {
        name: 'rot13',
        block: {
            size: 16,
            unit: 'KB'
        },
        complexity: 1,
        parallelism: 1,
    },
    {
        name: 'blowfish',
        block: {
            size: 32,
            unit: 'MB'
        },
        complexity: 84,
        parallelism: 64,
    },
    {
        name: 'RSA',
        block: {
            size: 4,
            unit: 'KB'
        },
        complexity: 120,
        parallelism: 30
    },
];

/*
Example:

const cypher = {
    blocks: 7489324,
    type: 'polymorphic',
    payoutPerBlock: 4
};
*/

export const generateCipher = (level) => {
    const blocks = Math.ceil((Math.random() * (200 * level)) + (200 * level));
    const type = Math.floor(Math.random() * cipherTypes.length);
    const payoutPerBlock = Math.ceil(Math.random() * (level + 4));

    return { blocks, type, payoutPerBlock };
};
