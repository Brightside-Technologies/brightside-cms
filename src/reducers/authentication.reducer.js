const initialState = {
    loggedInUser: {},
    isAuthenticated: false
};

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                loggedInUser: action.loggedInUser,
                isAuthenticated: true
            };
        case "LOGIN_WITH_GOOGLE_SUCCESS":
            return {
                ...state,
                loggedInUser: action.loggedInUser,
                isAuthenticated: true
            };
        case "LOGIN_LOADING":
            return {
                ...state,
                isLoading: action.isLoading
            };

        default:
            return state;
    }
}
