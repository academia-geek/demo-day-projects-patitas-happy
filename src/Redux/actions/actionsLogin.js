import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { authentication, google, facebook, dataBase } from "../../Firebase/firebaseConfig";
import { collection, addDoc, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { getUserFromDatabase } from "../../helpers/GetDoc";
import { typesUser } from "../types/types"
import Swal from "sweetalert2";

// import { registerUserAsync } from "./actionsRegister";


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
        type: typesUser.authenticated
    }
}


export const actionLoginSync = ({ id, email, password, displayName, accessToken,  phoneNumber, fullname, admin, fecha, error, photoURL, provider }) => {
    return {
        type: typesUser.login,
        payload: { id, email, password, displayName, accessToken,  phoneNumber, fullname, admin, fecha, error, photoURL }
    }
}

//-----2. Logout asíncrono

//--------------logout----------------//
export const actionClearRegisterAsync = () => {
    return (dispatch) => {
        signOut(authentication)
            .then(() => {
                dispatch(actionClearSync())
            })
            .catch((error) => { console.warn(error, '') });
    }
}

export const actionClearSync = () => {
    return {
        type: typesUser.clear
    }
}

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
        type: typesUser.logout
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
        type: typesUser.loginGoogleAndFacebook,
        payload: { id, email, displayName, accessToken, photoURL, phoneNumber, admin, error }
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
        type: typesUser.load,
        payload: { id, email, password, accessToken, fullname, photoURL, phoneNumber, admin }
    }
};

//-------------registrar usuario---------------//
export const registerUserAsync = (fullname, email, fecha, password, phoneNumber) => {
    return (dispatch) => {

        createUserWithEmailAndPassword(authentication, email, password)
            .then(async ({ user }) => {
                await updateProfile(authentication.currentUser, { displayName: fullname });

                const { accessToken } = user;

                const docRef = await addDoc(collection(dataBase, "users"), { fullname, email, fecha, password, phoneNumber, accessToken, admin: false });
                dispatch(registerUserSync({ id: docRef.id, fullname, email, fecha, password, phoneNumber, accessToken, error: false, admin: false }))
                console.log(user, 'Usuario Registrado')
            })
            .catch(error => console.warn(error))
    }
}

export const registerUserSync = ({ id, fullname, email, fecha, phoneNumber, password, accessToken, error, admin }) => {
    return {
        type: typesUser.register,
        payload: {
            id, fullname, email, fecha, phoneNumber, password, accessToken, error, admin
        }
    }
}

//--------editar usuario ---------------//

export const editUserAsync = (displayName, email, photoURL, phoneNumber, fecha, password) => {
    return async(dispatch) => {
        // const user = authentication.currentUser;
        // const newPassword = getASecureRandomPassword()
        await updateProfile(authentication.currentUser, {
            displayName: displayName, photoURL: photoURL, email: email
            
        })
        
        await updateEmail(authentication.currentUser, email)

        await updatePassword(authentication.currentUser, password)

        const collectionU = collection(dataBase, "users")
        const q = query(collectionU, where("email", "==", email))
        const datosQ = await getDocs(q)
        let id = ''

        datosQ.forEach((user) => {
            id=user.id
        })

        const docRef = doc(dataBase, "users", id)

        await updateDoc(docRef, {
            displayName, email, phoneNumber, fecha,  password, photoURL
        })


           .then(() => {
            dispatch(editUserSync(displayName, photoURL, email, phoneNumber, fecha, password ))
            console.log('yeeeh, perfil actualizado')
            console.log(displayName,photoURL, email, phoneNumber,fecha, password)
            dispatch(listUserSync({displayName, email, phoneNumber,fecha, photoURL, password}))
            Swal.fire({
                icon: 'success',
                title: 'Congratulations!',
                text: 'Se ha actualizado correctamente la información'
            })
            
            
          }).catch((error) => {
            alert('por favor, vuelve a iniciar sesion')
            console.log(error, 'perfil no fue actualizado')
          });

    }

}

export const editUserSync = (displayName, email, phoneNumber, photoURL, password) => {
    return {
        type: typesUser.edit,
        payload:  {displayName, email, phoneNumber, photoURL, password }
    }
}

//---------listar

export const listUserSync = (displayName, email, phoneNumber,fecha, photoURL, password) => {
    return {
        type: typesUser.list,
        payload: displayName, email, phoneNumber,fecha, photoURL, password
    }
}