import thunkMiddleware from "redux-thunk";
import {createStore, applyMiddleware} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../reducers/index.reducer";

const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
    persistedReducer,
    applyMiddleware(
        thunkMiddleware // lets us dispatch() functions
    )
);
export const persistor = persistStore(store);
