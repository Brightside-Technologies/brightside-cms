import {authRef} from "../firebase";
import UsersService from "../services/users.service";

function login(username, password) {
    return authRef()
        .signInWithEmailAndPassword(username, password)
        .then(response => {
            return response;
        });
}

function logout() {
    return authRef().signOut();
}

function loginWithGoogle() {
    const provider = new authRef.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");

    return authRef()
        .signInWithPopup(provider)
        .then(response => {
            console.log("GOOGLE", response);
            return UsersService.getByUid(response.user.uid);
        })
        .then(response => {
            if (!response) {
                return Promise.reject("System user not found");
            }
            console.log("currentUser", authRef().currentUser);
            return response;
        });
}

function loginWithFacebook() {
    const provider = new authRef.FacebookAuthProvider();
    provider.addScope("email");

    return authRef()
        .signInWithPopup(provider)
        .then(response => {
            /** TODO: temp. this should go in signUp?? */
            return UsersService.getByUid(response.user.uid).then(user => {
                const {isNewUser} = response.additionalUserInfo;
                const {photoURL} = response.user;
                const loggedInUser = Object.assign(user, {isNewUser, photoURL});
                return loggedInUser;
            });
        })
        .then(response => {
            if (!response) {
                return Promise.reject("System user not found");
            }
            return response;
        });
}

const AuthenticationService = {
    login,
    logout,
    loginWithGoogle,
    loginWithFacebook
};

export default AuthenticationService;
