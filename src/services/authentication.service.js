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
            console.log("RESPONSE", response);
            return response;
        });
}

const AuthenticationService = {
    login,
    logout,
    loginWithGoogle
};

export default AuthenticationService;
