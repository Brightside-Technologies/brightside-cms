import {authRef} from "../firebase";
import UsersService from "../services/users.service";

function login(email, password) {
    return authRef()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
            console.log("LOGIN WITH PASS", response);
            return UsersService.getByUid(response.user.uid);
        })
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
                return UsersService._delete().then(() => {
                    return Promise.reject(new Error("User does not exist"));
                });
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

            /** TODO: temp. this should go in signUp?? */
            return UsersService.getByUid(response.user.uid).then(user => {
                if (!user) {
                    return UsersService._delete().then(() => {
                        return Promise.reject(new Error("User does not exist"));
                    });
                }
                const {isNewUser} = response.additionalUserInfo;
                const {photoURL} = response.user;
                const loggedInUser = Object.assign(user, {isNewUser, photoURL});
                return loggedInUser;
            });
        })
        .then(response => {
            if (!response) {
                return UsersService._delete().then(() => {
                    return Promise.reject(new Error("User does not exist"));
                });
            }
            return response;
        });
}

function signUpUser(email, password, name) {
    let newUser = {
        email,
        name,
        role: "subscriber",
        photoURL: ""
    };
    return authRef()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
            console.log("USER SIGNED UP", response);
            newUser.id = response.user.uid;
            console.log("USER", newUser);
            return UsersService.create(newUser);
        })
        .then(response => {
            console.log("NEW USER", response);
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
