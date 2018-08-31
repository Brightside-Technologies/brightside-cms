import {dbRef} from "../firebase";
import {authRef} from "../firebase";

function getByUid(userUid) {
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

function create(newUser) {
    const {id, email, name, role, photoURL} = newUser;
    return dbRef()
        .collection("users")
        .doc(id)
        .set({
            email,
            name,
            role,
            photoURL
        });
}

const UsersService = {
    getByUid,
    _delete,
    create
};

export default UsersService;
