import AuthenticationService from "../services/authentication.service";
import {IS_LOADING, SET_REQUEST_ERROR} from "../actions/requests.actions";

const LOGIN_SUCCESS = loggedInUser => ({
    type: "LOGIN_SUCCESS",
    loggedInUser
});

const LOGOUT_SUCCESS = () => ({
    type: "LOGOUT_SUCCESS"
});

const LOGIN_WITH_GOOGLE_SUCCESS = loggedInUser => ({
    type: "LOGIN_WITH_GOOGLE_SUCCESS",
    loggedInUser
});

const LOGIN_WITH_FACEBOOK_SUCCESS = loggedInUser => ({
    type: "LOGIN_WITH_FACEBOOK_SUCCESS",
    loggedInUser
});

export function login(username, password) {
    return dispatch => {
        dispatch(IS_LOADING(true));
        return AuthenticationService.login(username, password)
            .then(response => {
                dispatch(IS_LOADING(false));
                dispatch(LOGIN_SUCCESS(response));
                return response;
            })
            .catch(error => {
                dispatch(IS_LOADING(false));
                dispatch(SET_REQUEST_ERROR(error));
                throw new Error(error);
            });
    };
}

export function logout() {
    return dispatch => {
        dispatch(IS_LOADING(true));
        return AuthenticationService.logout()
            .then(() => {
                dispatch(IS_LOADING(false));
                dispatch(LOGOUT_SUCCESS());
            })
            .catch(error => {
                dispatch(IS_LOADING(false));
                dispatch(SET_REQUEST_ERROR(error));
                throw new Error(error);
            });
    };
}

export function loginWithGoogle() {
    return dispatch => {
        dispatch(IS_LOADING(false));
        return AuthenticationService.loginWithGoogle()
            .then(response => {
                dispatch(IS_LOADING(false));
                dispatch(LOGIN_WITH_GOOGLE_SUCCESS(response));
                return response;
            })
            .catch(error => {
                dispatch(IS_LOADING(false));
                dispatch(SET_REQUEST_ERROR(error));
                throw new Error(error);
            });
    };
}

export function loginWithFacebook() {
    return dispatch => {
        dispatch(IS_LOADING(false));
        return AuthenticationService.loginWithFacebook()
            .then(response => {
                dispatch(IS_LOADING(false));
                dispatch(LOGIN_WITH_FACEBOOK_SUCCESS(response));
                return response;
            })
            .catch(error => {
                dispatch(IS_LOADING(false));
                dispatch(SET_REQUEST_ERROR(error));
                throw new Error(error);
            });
    };
}
