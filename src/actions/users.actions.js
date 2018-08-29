import UsersService from "../services/users.service";

const GET_USER_BY_UID_SUCCESS = user => ({
    type: "GET_USER_BY_UID_SUCCESS",
    user
});

export function getUserByUid(userUid) {
    return dispatch =>
        UsersService.getByUid(userUid)
            .then(response => {
                dispatch(GET_USER_BY_UID_SUCCESS(response));
                return response;
            })
            .catch(error => {
                /** TODO: dispatch some kind of global error handler here */
                throw new Error(error);
            });
}

export function deleteCurrentUser() {
    return dispatch =>
        UsersService._delete()
            .then(response => {})
            .catch(error => {
                throw new Error(error);
            });
}
