import {types as EventTypes} from '../events';
import genericReducer from '../../_common/reducers/generic-reducer';

const initialState = {
    type: 'LCD',
    resolution: 1
};

const reductionLookup = {
    [EventTypes.SetDisplayType]: (state, type) => ({ ...state, type }),
    [EventTypes.SetDisplayResolution]: (state, resolution) => ({ ...state, resolution }),
};

export default genericReducer(initialState, reductionLookup);
