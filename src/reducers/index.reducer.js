import {combineReducers} from "redux";
import authenticationReducer from "./authentication.reducer";

const appReducer = combineReducers({
    authenticationReducer
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
