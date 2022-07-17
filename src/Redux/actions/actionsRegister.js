import { typesRegister, typesUser } from "../types/types"
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { collection, addDoc } from "firebase/firestore";
import { authentication, dataBase } from "../../Firebase/firebaseConfig"
import Swal from "sweetalert2";


export const editUserAsync = (displayName, email, phoneNumber) => {
    return (dispatch) => {
        updateProfile(authentication.currentUser, {
            displayName: displayName, email: email, phoneNumber: phoneNumber
            
        })
       
        
        .then(() => {
            dispatch(editUserSync(displayName, email, phoneNumber))
            console.log('yeeeh, perfil actualizado')
            Swal.fire({
                icon: 'success',
                title: 'Congratulations!',
                text: 'Se ha actualizado correctamente la información'
            })
            
            window.location.reload(true);
          }).catch((error) => {
            console.log(error, 'perfil no fue actualizado')
          });
    }
    
}

export const editUserSync = (displayName, email,  phoneNumber, photoURL) => {
    return {
        type: typesUser.edit,
        payload: {displayName, email, phoneNumber, photoURL}
    }
}

//----------listar usuario-----------------//
// export const listUserAsync = () => {
//     return async (dispatch) => {
//         const user = authentication.currentUser;
//         // const collectionListar = await getDocs(collection(dataBase, "users"))
//         // console.log(collectionListar)
//         const array1 = await [{ displayName: user.displayName, email: user.email, phoneNumber: user.photoURL }]

//         const listUser = []
//         array1.forEach(listar => {
//             listUser.push(
//                 {
//                     ...listar
//                 }
//             )
//             console.log(listUser)
//         })
//         dispatch(listUserSync(listUser))
//     }
// }

// export const listUserSync = (user) => {
//     return {
//         type: typesUser.list,
//         payload: user
//     }
// }

//-------------registrar usuario---------------//
export const registerUserAsync = (fullname, email, fecha, password, phoneNumber) => {
    return (dispatch) => {

        createUserWithEmailAndPassword(authentication, email, password)
            .then(async ({ user }) => {
                await updateProfile(authentication.currentUser, { displayName: fullname })

                const docRef = await addDoc(collection(dataBase, "users"), { fullname, email, fecha, password, phoneNumber, admin: false });
                dispatch(registerUserSync({ id: docRef.id, fullname, email, fecha, password, phoneNumber, error: false, admin: false }))
                console.log(user, 'Usuario Registrado')
            })
            .catch(error => console.warn(error))
    }
}

export const registerUserSync = ({ id, fullname, email, fecha, phoneNumber, password, error, admin }) => {
    return {
        type: typesRegister.register,
        payload: {
            id, fullname, email, fecha, phoneNumber, password, error, admin
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