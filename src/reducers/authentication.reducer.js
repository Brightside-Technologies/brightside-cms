const initialState = {
    username: "",
    name: "",
    isAuthenticated: false
};

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                username: action.response.Username,
                name: action.response.Name,
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
