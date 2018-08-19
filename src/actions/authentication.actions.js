import AuthenticationService from "../services/authentication.service";

const LOGIN_SUCCESS = response => ({
    type: "LOGIN_SUCCESS",
    response
});

const LOGOUT_SUCCESS = () => ({
    type: "LOGOUT_SUCCESS"
});

export function login(username, password) {
    return dispatch =>
        /** TODO: dispatch global loading event */
        AuthenticationService.login(username, password)
            .then(response => {
                dispatch(LOGIN_SUCCESS(response));
                /** TODO: turn off global loading event */
            })
            .catch(error => {
                /** TODO: dispatch some kind of global error handler here */
                throw new Error("LOGIN_ERROR");
            });
}

export function logout() {
    return dispatch =>
        /** TODO: dispatch global loading event */
        AuthenticationService.logout()
            .then(() => {
                /** TODO: turn off global loading event */
                dispatch(LOGOUT_SUCCESS());
            })
            .catch(error => {
                /** TODO: dispatch some kind of global error handler here */
                throw new Error("LOGOUT_ERROR");
            });
}
