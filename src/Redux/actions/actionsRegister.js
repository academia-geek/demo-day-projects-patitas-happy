import { typesRegister, typesUser } from "../types/types"
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { collection, addDoc } from "firebase/firestore";
import { authentication, dataBase } from "../../Firebase/firebaseConfig"
import Swal from "sweetalert2";


export const editUserAsync = (displayName, email, photoURL) => {
    return (dispatch) => {
        updateProfile(authentication.currentUser, {

            displayName: displayName, photoURL: photoURL, email: email, 
            
        })
       
        
        .then(() => {
            dispatch(editUserSync(displayName,photoURL, email ))
            console.log('yeeeh, perfil actualizado')
            console.log(displayName,photoURL, email)
            Swal.fire({
                icon: 'success',
                title: 'Congratulations!',
                text: 'Se ha actualizado correctamente la información'
            })
            
            
          }).catch((error) => {
            console.log(error, 'perfil no fue actualizado')
          });

    }

}

export const editUserSync = (displayName, email, phoneNumber, photoURL) => {
    return {
        type: typesUser.edit,
        payload: { displayName, email, phoneNumber, photoURL }
    }
}

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
        type: typesRegister.register,
        payload: {
            id, fullname, email, fecha, phoneNumber, password, accessToken, error, admin
        }
    }
}


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
        type: typesRegister.clear
    }
}