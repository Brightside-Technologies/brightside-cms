import {combineReducers} from "redux";
import authenticationReducer, * as FromAuthentication from "./authentication.reducer";
import usersReducer, * as FromUsers from "./users.reducer";
import * as FromRequests from "./requests.reducer";

const AUTH = "AUTH";
const USERS = "USERS";
const REQUEST_ERROR_MESSAGE = "REQUEST_ERROR_MESSAGE";
const REQUEST_SUCCESS_MESSAGE = "REQUEST_SUCCESS_MESSAGE";
const REQUEST_IS_LOADING = "REQUEST_IS_LOADING";

const appReducer = combineReducers({
    [AUTH]: authenticationReducer,
    [USERS]: usersReducer,
    [REQUEST_ERROR_MESSAGE]: FromRequests.errorMessage,
    [REQUEST_SUCCESS_MESSAGE]: FromRequests.successMessage,
    [REQUEST_IS_LOADING]: FromRequests.isLoading
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;

/** PUBLIC SELECTORS */
export function getIsLoading(store) {
    return FromRequests.getIsLoading(store[REQUEST_IS_LOADING]);
}

export function getErrorMessage(store) {
    return FromRequests.getErrorMessage(store[REQUEST_ERROR_MESSAGE]);
}

export function getLoggedInUser(store) {
    return FromAuthentication.getLoggedInUser(store[AUTH]);
}

export function getUserByUid(store) {
    return FromUsers.getUserByUid(store[USERS]);
}
