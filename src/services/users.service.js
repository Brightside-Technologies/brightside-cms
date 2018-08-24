import {dbRef} from "../firebase";

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

const UsersService = {
    getByUid
};

export default UsersService;
