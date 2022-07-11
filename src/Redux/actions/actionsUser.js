import { typesUser } from "../types/types"
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { authentication } from "../../Firebase/firebaseConfig"


export const registerUserAsync = (nombre, email, pass ) => {
    return (dispatch) => {
        
        createUserWithEmailAndPassword(authentication, email, pass)
        .then(async({user})=> {
            await updateProfile(authentication.currentUser, {displayName : nombre})
            
           dispatch(registerUserSync(nombre, email, pass))
           console.log(user, 'Usuario Registrado')
       })
       .catch(error =>console.warn(error))
    }
}

export const registerUserSync = (nombre, email, fecha, telefono, pass) => {
    return {
        type: typesUser.register,
        payload: {
            nombre, email, fecha, telefono, pass
        }
    }
}