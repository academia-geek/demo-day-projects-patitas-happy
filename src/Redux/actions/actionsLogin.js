import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { authentication, google, facebook } from "../../Firebase/firebaseConfig";
import { getUserFromDatabase } from "../../helpers/GetDoc";
import { typesLogin } from "../types/types"


//---------Login---------------//

//----1. Validación con usuario y contraseña-----//

//----1.1 Acción asícrona
export const actionLoginAsync = (email, password) => {
    return async (dispatch) => {
        const user = await signInWithEmailAndPassword(authentication, email, password);
        const userData = await getUserFromDatabase(email);
        const { displayName, accessToken, photoURL } = user.user;
        const { id, phoneNumber, admin, fecha } = userData;

        dispatch(actionLoginSync({ id, email, password, displayName, accessToken, phoneNumber, admin, fecha, error: false, photoURL }));
    }
}

//----1.2 Acción síncrona

export const actionAuthenticatedSync = (item) => {
    return {
        type: typesLogin.authenticated
    }
}


export const actionLoginSync = ({ id, email, password, displayName, accessToken,  phoneNumber, admin, fecha, error, photoURL }) => {
    return {
        type: typesLogin.login,
        payload: { id, email, password, displayName, accessToken,  phoneNumber, admin, fecha, error, photoURL }
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