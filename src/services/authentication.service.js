import {authRef} from "../firebase";
import UsersService from "../services/users.service";

function login(email, password) {
    return authRef()
        .signInWithEmailAndPassword(email, password)
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
            return UsersService.getByUid(response.user.uid);
        })
        .then(response => {
            if (!response) {
                return Promise.reject("System user not found");
            }
            return response;
        });
}

function signUpUser(newUser) {
    const {email, password} = newUser;
    return authRef()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
            console.log("USER SIGNED UP", response);

            /** TODO: userDTO has role: subscriber,  name, email, photoUrl: avatar or whatever they used to sign up with */
            // newUser.role = "subscriber";
            // newUser.photoUrl = newUser.photoUrl || gravatar
            // return UsersService.create(newUser);
            return response;
        });
}

const AuthenticationService = {
    login,
    logout,
    loginWithGoogle,
    loginWithFacebook,
    signUpUser
};

export default AuthenticationService;
