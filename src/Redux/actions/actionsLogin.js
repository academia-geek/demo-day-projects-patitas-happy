import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { authentication, google, facebook } from "../../Firebase/firebaseConfig";
import { typesLogin } from "../types/types"


//---------Login---------------//

//----1. Validación con usuario y contraseña-----//

//----1.1 Acción asícrona
export const actionLoginAsync = (email, password) => {
    return (dispatch) => {
        signInWithEmailAndPassword(authentication, email, password)
            .then(({ user }) => {
                const { displayName, accessToken, photoURL, phoneNumber } = user;
                dispatch(actionLoginSync({ email, password, displayName, accessToken, photoURL, phoneNumber, error: false }));
                
            })
            .catch(error => {
                console.log(error);
                dispatch(actionLoginSync({ error: true, authenticated: undefined }));
            });
    }
}

//----1.2 Acción síncrona

export const actionAuthenticatedSync = (item) => {
    return {
        type: typesLogin.authenticated
    }
}


export const actionLoginSync = ({ email, password, displayName, accessToken, photoURL, phoneNumber, error }) => {
    return {
        type: typesLogin.login,
        payload: { email, password, displayName, accessToken, photoURL, phoneNumber, error }
    }
}

//-----2. Logout asíncrono
export const actionLogoutAsyn = () => {
    return (dispatch) => {
        signOut(authentication)
            .then(() => {
                dispatch(actionLogoutSyn());
                
            })
            .catch((error) => { console.warn(error, '') });
    }
}

//-----2.1 Logout síncrono
export const actionLogoutSyn = () => {
    return {
        type: typesLogin.logout
    }
}


//---3. Inicialización con Google
export const loginGoogle = () => {
    return (dispatch) => {
        console.log('dentro de google')
        signInWithPopup(authentication, google)
            .then(({ user }) => {
                dispatch(actionLoginGoogleAndFacebookSync(user.email, user.displayName, user.accessToken, user.photoURL, user.phoneNumber));
                dispatch(actionAuthenticatedSync());
                console.log(user, 'Usuario Autorizado, Bienvenido')
            })
            .catch(error => {
                console.warn(error, 'Usuario NO Autorizado')
            })
    }
}

//---4. Inicialización con Facebook
export const loginFacebook = () => {
    return (dispatch) => {
        console.log("dentro de facebook");
        signInWithPopup(authentication, facebook)
            .then((result) => {
                const user = result.user;
                dispatch(actionLoginGoogleAndFacebookSync(user.email, user.displayName, user.accessToken, user.photoURL, user.phoneNumber));
                dispatch(actionAuthenticatedSync());
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export const actionLoginGoogleAndFacebookSync = (email, displayName, accessToken, photoURL, phoneNumber) => {
    return {
        type: typesLogin.loginGoogleAndFacebook,
        payload: { email, displayName, accessToken, photoURL, phoneNumber }
    }
}