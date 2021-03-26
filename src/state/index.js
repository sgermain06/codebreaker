import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import reducer from './reducer';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';

// eslint-disable-next-line
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const config = {
    key: 'root',
    storage,
};

export default function state() {

    const middleware = [
        thunk,
    ];

    const store = createStore(
        persistReducer(config, reducer),
        composeEnhancers(applyMiddleware(...middleware))
    );

    const persistor = persistStore(store);

    return {
        store,
        persistor
    };
};