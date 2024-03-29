import { useEffect } from 'react';
import * as PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { dataSizeFromSuffix, dataSizeSuffix } from '../../lib/utils';

import isEmpty from 'lodash/isEmpty';

import fromState from '../../state/selectors';
import Commands from '../../state/commands';

const mapStateToProps = state => ({
    activeCipher: fromState.Ciphers.getCurrentCipher()(state),
    broadbandBitrate: fromState.Station.broadbandSpeed()(state).bitrate,
    broadbandReliability: fromState.Station.broadbandReliability()(state),
});

const mapDispatchToProps = dispatch => ({
    completeCipher: cipher => () => dispatch(Commands.Ciphers.completeCipher(cipher)),
    updateCipher: cipher => prop => dispatch(Commands.Ciphers.updateCipher(cipher, prop)),
    addNetworkActivity: blockSize => dispatch(Commands.Station.addNetworkActivity(blockSize)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    completeCipher: dispatchProps.completeCipher(stateProps.activeCipher),
    updateCipher: dispatchProps.updateCipher(stateProps.activeCipher),
});

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
function CodeBreaker(props) {

    useEffect(() => {

        const {
            activeCipher,
            broadbandBitrate,
            completeCipher,
            updateCipher,
            gameController,
            addNetworkActivity,
        } = props;

        const networkNoise = () => Math.random() * (Math.random() < 0.5 ? -1 : 1);

        const downloadBlock = activeCipher => {
            const cipherSize = dataSizeFromSuffix(activeCipher.type.block) * activeCipher.blocks;
            const modifier = (10 + networkNoise());
            // console.log('Modifier:', modifier);
            const networkSpeed = (broadbandBitrate / modifier);
            console.log('Network Speed:', networkSpeed);

            let downloadedBlockSize = networkSpeed;
            const returnObj = {};

            if (activeCipher.progress < cipherSize) {
                if (cipherSize - activeCipher.progress < networkSpeed) {
                    downloadedBlockSize = cipherSize - activeCipher.progress;
                }
                returnObj.blockSize = downloadedBlockSize;
                returnObj.progress = (activeCipher.progress + downloadedBlockSize);
            }
            else {
                returnObj.progress = 0;
                returnObj.blockSize = 0;
                returnObj.status = 'breaking';
            }
            return returnObj;
        }

        const update = {
            id: 'codeBreaker',
            callback: (frame, count, exponent) => {
                // This is where we calculate the parameters for breaking the cipher.
                // The algorithm is described in the /lib/cipher.js file.
                console.debug(`[CODE BREAKER] Frames: ${frame}, Count: ${count}, Exponent: ${exponent}`);
                let networkActivity = 100 + networkNoise();
                // Flow:
                if (!isEmpty(activeCipher)) {
                    switch(activeCipher.status) {
                        case 'downloading':
                            const cipherSize = dataSizeFromSuffix(activeCipher.type.block) * activeCipher.blocks;
                            const download = downloadBlock(activeCipher);
                            networkActivity = download.blockSize;
                            updateCipher(download);
                            console.debug('Downloading! Progress:', activeCipher.progress, 'Cipher size:', dataSizeSuffix(cipherSize));
                            break;
                        case 'breaking':
                            if ((Number(frame.toFixed(3)) * 250) % 5 === 0) {
                                updateCipher({ progress: activeCipher.progress + 1 });
                            }
                            if (activeCipher.progress >= activeCipher.blocks) {
                                completeCipher(activeCipher);
                            }
                            break;
                        default:
                            updateCipher({ status: 'downloading', progress: 0 });
                            break;
                    }

                    // console.log('Active Cipher Status:', activeCipher.status);
                }

                addNetworkActivity(networkActivity);
            }
        };

        gameController.addProcess(update);
    }, [props]);

    return null;
}

CodeBreaker.propTypes = {
    gameController: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CodeBreaker);