const uuid = require('uuid').v4;
// We can add as much as we want
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
    id: <uuid>,
    blocks: 7489324,
    type: { name: 'polymorphic', ... },
    payoutPerBlock: 0.04
};
*/

export const generateCipher = (level) => {
    const blocks = Math.ceil((Math.random() * (200 * level)) + (200 * level));
    const type = cipherTypes[Math.floor(Math.random() * cipherTypes.length)];
    const payoutPerBlock = Math.ceil(Math.random() * (level * 0.04));

    return {
        id: uuid(),
        blocks,
        type,
        payoutPerBlock,
    };
};
