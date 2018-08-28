const initialState = {
    isLoading: false
};

export function errorMessage(state = null, action) {
    const {type, error} = action;

    if (type === "RESET_ERROR_MESSAGE") {
        return null;
    } else if (error) {
        return error;
    }

    return state;
}

export const successMessage = (state = null, action) => {
    const {type, success} = action;

    if (type === "RESET_SUCCESS_MESSAGE") {
        return null;
    } else if (success) {
        return success;
    }

    return state;
};

export function isLoading(state = initialState, action) {
    switch (action.type) {
        case "IS_LOADING":
            return {
                ...state,
                isLoading: action.isLoading
            };

        default:
            return state;
    }
}

/** PRIVATE SELECTORS */
export function getIsLoading(store) {
    return store.isLoading;
}

export function getErrorMessage(store) {
    let message = "";
    if (store && store.code) {
        switch (store.code) {
            case "auth/wrong-password":
                message = "Wrong username or password";
                break;
            case "auth/invalid-email":
                message = "Invalid email format";
                break;
            case "auth/account-exists-with-different-credential":
                message = "Email already exists but is associated with a different provider";
                break;
            default:
                message = "An Error occurred";
        }
    }
    return message;
}
