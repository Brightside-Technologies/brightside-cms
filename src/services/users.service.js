import {dbRef} from "../firebase";
import {authRef} from "../firebase";

function getByUid(userUid) {
    console.log("userID", userUid);
    return dbRef()
        .collection("users")
        .doc(userUid)
        .get()
        .then(response => {
            return response.data();
        });
}

function _delete() {
    return authRef().currentUser.delete();
}

const UsersService = {
    getByUid,
    _delete
};

export default UsersService;
