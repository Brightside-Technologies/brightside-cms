import {combineReducers} from "redux";
import authenticationReducer from "./authentication.reducer";
import usersReducer from "./users.reducer";

const appReducer = combineReducers({
    authenticationReducer,
    usersReducer
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
