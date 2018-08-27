export const RESET_ERROR_MESSAGE = () => ({
    type: "RESET_ERROR_MESSAGE"
});

export const SET_REQUEST_ERROR = error => ({
    type: "SET_REQUEST_ERROR",
    error
});

export const RESET_SUCCESS_MESSAGE = () => ({
    type: "RESET_SUCCESS_MESSAGE"
});

export const SET_REQUEST_SUCCESS = success => ({
    type: "SET_REQUEST_SUCCESS",
    success
});

export const IS_LOADING = isLoading => ({
    type: "IS_LOADING",
    isLoading: isLoading
});
