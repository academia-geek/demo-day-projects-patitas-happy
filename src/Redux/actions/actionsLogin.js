import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../../Firebase/firebaseConfig";
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