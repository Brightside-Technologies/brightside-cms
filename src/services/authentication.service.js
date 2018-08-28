import {authRef} from "../firebase";

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
            return response;
        });
}

function loginWithFacebook() {
    const provider = new authRef.FacebookAuthProvider();
    provider.addScope("email");

    return authRef()
        .signInWithPopup(provider)
        .then(response => {
            console.log("FACEBOOK", response);
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
