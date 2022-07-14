import { typesRegister } from "../types/types"
import {  createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { collection, addDoc } from "firebase/firestore";
import { authentication, dataBase } from "../../Firebase/firebaseConfig"


export const registerUserAsync = (fullname, email, fecha, password, phoneNumber ,img) => {
    return (dispatch) => {
        
        createUserWithEmailAndPassword(authentication, email, password)
        .then(async({user})=> {
            await updateProfile(authentication.currentUser, {displayName : fullname})

            const docRef = await addDoc(collection(dataBase, "users"), { fullname, email, fecha, password, phoneNumber });
           dispatch(registerUserSync({ id: docRef.id, fullname, email, fecha, password, phoneNumber, error: false }))
           console.log(user, 'Usuario Registrado')
       })
       .catch(error =>console.warn(error))
    }
}

export const registerUserSync = ({id, fullname, email, fecha, phoneNumber, password, error}) => {
    return {
        type: typesRegister.register,
        payload: {
            id, fullname, email, fecha, phoneNumber, password, error
        }
    }
}

export const actionLogoutAsync = () => {
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