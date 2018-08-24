const initialState = {
    user: {}
};

export default function users(state = initialState, action) {
    switch (action.type) {
        case "GET_USER_BY_UID_SUCCESS":
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
}
