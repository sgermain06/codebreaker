import Events from '../events';

import fromState from '../../selectors';

const returnObj = {
    increaseCpuSpeed: () => (dispatch, getState) => {
        const currentSpeed = fromState.Station.cpuSpeed()(getState());
        dispatch(Events.SetCpuSpeed(Number((currentSpeed + 0.1).toFixed(2))))
    },
    resetCpuSpeed: () => dispatch => {
        dispatch(Events.SetCpuSpeed(1));
    },
};

export default returnObj;