import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { authentication, google, facebook, dataBase } from "../../Firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getUserFromDatabase } from "../../helpers/GetDoc";
import { typesLogin } from "../types/types"


//---------Login---------------//

//----1. Validación con usuario y contraseña-----//

//----1.1 Acción asícrona
export const actionLoginAsync = (email, password) => {
    return async (dispatch) => {
        const user = await signInWithEmailAndPassword(authentication, email, password);
        const userData = await getUserFromDatabase(email);
        const {photoURL, displayName, accessToken } = user.user;
        const { id, phoneNumber, fullname, admin, fecha, provider } = userData;

        dispatch(actionLoginSync({ id, email, password, displayName, accessToken, phoneNumber, fullname, admin, fecha, error: false, photoURL, provider }));
    }
}

//----1.2 Acción síncrona

export const actionAuthenticatedSync = (item) => {
    return {
        type: typesLogin.authenticated
    }
}


export const actionLoginSync = ({ id, email, password, displayName, accessToken,  phoneNumber, fullname, admin, fecha, error, photoURL, provider }) => {
    return {
        type: typesLogin.login,
        payload: { id, email, password, displayName, accessToken,  phoneNumber, fullname, admin, fecha, error, photoURL, provider }
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
            .then(async ({ user }) => {
                const { email, displayName, accessToken, photoURL, phoneNumber } = user;
                const userFound = await getUserFromDatabase(email);

                if (Object.keys(userFound).length) {
                    dispatch(actionLoginGoogleAndFacebookSync({ id: userFound.id, email: userFound.email, displayName, accessToken, photoURL, phoneNumber, admin: userFound.admin, provider: userFound.provider }, false));
                    
                    console.log(user, 'Usuario Autorizado, Bienvenido')
                } else {
                    const docRef = await addDoc(collection(dataBase, "users"), { email, displayName, accessToken, photoURL, phoneNumber, admin: false, provider: 'googleFacebook' });
                    dispatch(actionLoginGoogleAndFacebookSync({ id: docRef.id, email, displayName, accessToken, photoURL, phoneNumber, admin: false, provider: 'googleFacebook' }, false));
                    
                    console.log(user, 'Usuario Autorizado, Bienvenido')
                }

            })
            .catch(error => {
                console.warn(error, 'Usuario NO Autorizado');
                dispatch(actionLoginGoogleAndFacebookSync({}, true));
            })
    }
}

//---4. Inicialización con Facebook
export const loginFacebook = () => {
    return (dispatch) => {
        console.log("dentro de facebook");
        signInWithPopup(authentication, facebook)
            .then(async ({ user }) => {
                const { email, displayName, accessToken, photoURL, phoneNumber } = user;
                const userFound = await getUserFromDatabase(email);

                if (Object.keys(userFound).length) {
                    dispatch(actionLoginGoogleAndFacebookSync({ id: userFound.id, email: userFound.email, displayName, accessToken, photoURL, phoneNumber, admin: userFound.admin, provider: userFound.provider }, false));
                    
                    console.log(user, 'Usuario Autorizado, Bienvenido')
                } else {
                    const docRef = await addDoc(collection(dataBase, "users"), { email, displayName, accessToken, photoURL, phoneNumber, admin: false, provider: 'googleFacebook' });
                    dispatch(actionLoginGoogleAndFacebookSync({ id: docRef.id, email, displayName, accessToken, photoURL, phoneNumber, admin: false, provider: 'googleFacebook' }, false));
                    
                    console.log(user, 'Usuario Autorizado, Bienvenido')
                }

            })
            .catch(error => {
                console.warn(error, 'Usuario NO Autorizado');
                dispatch(actionLoginGoogleAndFacebookSync({}, true));
            })
    }
}

export const actionLoginGoogleAndFacebookSync = ({ id, email, displayName, accessToken, photoURL, phoneNumber, admin, provider }, error) => {
    return {
        type: typesLogin.loginGoogleAndFacebook,
        payload: { id, email, displayName, accessToken, photoURL, phoneNumber, admin, provider, error }
    }
}

//-----Persistencia de los datos de usuario al recargar la aplicación

export const actionUserDataLoadAsync = (email) => {
    return (dispatch) => {
        getUserFromDatabase(email).then(dataUser => {
            const { id, email, password, fullname, accessToken, photoURL, phoneNumber, fecha, admin, provider } = dataUser;

            dispatch(actionUserDataLoadSync({ id, email, password, fullname, accessToken, photoURL, phoneNumber, fecha, admin, provider }))
        }).catch(error => {
            console.log(error);
        });
    }
};

export const actionUserDataLoadSync = ({ id, email, password, fullname, accessToken, photoURL, phoneNumber, fecha, admin, provider }) => {
    return {
        type: typesLogin.load,
        payload: { id, email, password, fullname, accessToken, photoURL, phoneNumber, fecha, admin, provider }
    }
};
