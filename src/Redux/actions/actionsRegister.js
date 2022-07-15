import { typesRegister, typesUser } from "../types/types"
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { collection, addDoc, getDocs } from "firebase/firestore";
import { authentication, dataBase } from "../../Firebase/firebaseConfig"


//----------listar usuario-----------------//
export const listUserAsync = () => {
    return async (dispatch) => {
        const user = authentication.currentUser;
        // const collectionListar = await getDocs(collection(dataBase, "users"))
        // console.log(collectionListar)
        const array1 = await [{ displayName: user.displayName, email: user.email, phoneNumber: user.photoURL }]

        const listUser = []
        array1.forEach(listar => {
            listUser.push(
                {
                    ...listar
                }
            )
            console.log(listUser)
        })
        dispatch(listUserSync(listUser))
    }
}

export const listUserSync = (user) => {
    return {
        type: typesUser.list,
        payload: user
    }
}

//-------------registrar usuario---------------//
export const registerUserAsync = (fullname, email, fecha, password, phoneNumber, img) => {
    return (dispatch) => {

        createUserWithEmailAndPassword(authentication, email, password)
            .then(async ({ user }) => {
                await updateProfile(authentication.currentUser, { displayName: fullname })

                const docRef = await addDoc(collection(dataBase, "users"), { fullname, email, fecha, password, phoneNumber });
                dispatch(registerUserSync({ id: docRef.id, fullname, email, fecha, password, phoneNumber, error: false }))
                console.log(user, 'Usuario Registrado')
            })
            .catch(error => console.warn(error))
    }
}

export const registerUserSync = ({ id, fullname, email, fecha, phoneNumber, password, error }) => {
    return {
        type: typesRegister.register,
        payload: {
            id, fullname, email, fecha, phoneNumber, password, error
        }
    }
}

//--------------logout----------------//
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