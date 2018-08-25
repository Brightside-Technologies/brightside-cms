import {combineReducers} from "redux";
import authenticationReducer, * as FromAuthentication from "./authentication.reducer";
import usersReducer, * as FromUsers from "./users.reducer";

const AUTH = "AUTH";
const USERS = "USERS";

const appReducer = combineReducers({
    [AUTH]: authenticationReducer,
    [USERS]: usersReducer
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;

export function getLoggedInUser(store) {
    return FromAuthentication.getLoggedInUser(store[AUTH]);
}

export function getUserByUid(store) {
    return FromUsers.getUserByUid(store[USERS]);
}
