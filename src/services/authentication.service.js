import {authRef} from "../firebase";

function login(username, password) {
    /**
     *  Just resolve a promise here to simulate a login request
     *  Assume response from login request contains user's name to
     *  display on navbar
     * */
    return new Promise(resolve => resolve({Username: username, Name: "Jane Doe"}));
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
