import { typesUser } from "../types/types"
import { createUserWithEmailAndPassword, signOut, updatePassword, updateProfile } from "firebase/auth"
import { collection, addDoc, updateDoc, doc, query, getDocs, getDoc } from "firebase/firestore";
import { authentication, dataBase } from "../../Firebase/firebaseConfig"
import Swal from "sweetalert2";
import { actionLogoutSyn } from "./actionsLogin";

const collectionName = "users";

export const editUserAsync = (usuario) => {
    return (dispatch) => {
        updateProfile(authentication.currentUser, {
            displayName: usuario.displayName,
            photoURL: usuario.photoURL,
            email: usuario.email,
        })
            .then(() => {
                updatePassword(authentication.currentUser, usuario.password)
                    .then(async () => {
                        console.log('La contraseña si se actualizó')
                        try {

                            const user = doc(dataBase, collectionName, usuario.id);
                            updateDoc(user, usuario)
                                .then(() => {
                                    dispatch(editUserSync({ id: user.id, ...usuario }, false))
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Congratulations!',
                                        text: 'Se ha actualizado correctamente la información'
                                    })
                                })
                                .catch(error => {
                                    console.log(error);
                                    dispatch(editUserSync({}, true))
                                });
                        } catch (error) {
                            console.log(error, 'que mal!');
                        }
                    }).catch((error) => {
                        Swal.fire({
                            icon: 'info',
                            title: '¡Ooh! Su sesión ha espirado',
                            text: 'Por favor inicie nuevamente sesión y actualice sus datos',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        }).then(() => {
                            dispatch(actionClearRegisterAsync())
                            dispatch(actionLogoutSyn())
                            localStorage.clear();
                        })
                        console.log(error)
                    });

            }).catch((error) => {
                console.log(error, 'perfil no fue actualizado')
            });

    }

}

export const editUserProviderAsync = (usuario) => {
    return (dispatch) => {
        updateProfile(authentication.currentUser, {
            displayName: usuario.displayName,
            photoURL: usuario.photoURL,
            email: usuario.email,
        })
            .then(async () => {
                try {

                    const user = doc(dataBase, collectionName, usuario.id);
                    updateDoc(user, usuario)
                        .then(() => {
                            dispatch(editUserSync({ id: user.id, ...usuario }, false))
                            Swal.fire({
                                icon: 'success',
                                title: 'Congratulations!',
                                text: 'Se ha actualizado correctamente la información'
                            })
                        })
                        .catch(error => {
                            console.log(error);
                            dispatch(editUserSync({}, true))
                        });
                } catch (error) {
                    console.log(error, 'que mal!');
                }

            }).catch((error) => {
                console.log(error, 'perfil no fue actualizado')
            });

    }

}

export const editUserSync = ({ ...usuario }, error) => {
    return {
        type: typesUser.edit,
        payload: {
            ...usuario,
            error: error
        }
    }
}

//-------------registrar usuario---------------//
export const registerUserAsync = (fullname, email, fecha, password, phoneNumber) => {
    return (dispatch) => {

        createUserWithEmailAndPassword(authentication, email, password)
            .then(async ({ user }) => {
                await updateProfile(authentication.currentUser, { displayName: fullname });

                const { accessToken } = user;

                const docRef = await addDoc(collection(dataBase, collectionName), { fullname, email, fecha, password, phoneNumber, accessToken, admin: false, provider: 'emailPassword' });
                dispatch(registerUserSync({ id: docRef.id, fullname, email, fecha, password, phoneNumber, accessToken, error: false, admin: false, provider: 'emailPassword' }))
                console.log(user, 'Usuario Registrado')
            })
            .catch(error => console.warn(error))
    }
}

export const registerUserSync = ({ id, fullname, email, fecha, phoneNumber, password, accessToken, error, admin, provider }) => {
    return {
        type: typesUser.register,
        payload: {
            id, fullname, email, fecha, phoneNumber, password, accessToken, error, admin, provider
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
        type: typesUser.clear
    }
}


export const fillUsersAsync = () => {
    return (dispatch) => {
        const collectionUsers = collection(dataBase, collectionName);
        const querySnapshot = query(collectionUsers);
        getDocs(querySnapshot)
            .then((documents) => {
                const data = [];
                documents.forEach((document) => {
                    data.push({
                        idUser: document.id,
                        ...document.data(),
                    });
                });

                dispatch(
                    fillUsersSync({
                        users: data
                    })
                );
            })
            .catch((error) => {
                console.log(error);
                // dispatch(errorSync({ error: true }));
            });
    }
}


export const fillUsersSync = (params) => {
    return {
        type: typesUser.list,
        payload: {
            users: params.users
        }
    }
}


export const fillUserAsync = (idUser) => {
    return (dispatch) => {
        const docRef = doc(dataBase, collectionName, idUser);
        getDoc(docRef).then(docSnapshot => {
            if (docSnapshot.exists()) {
                // console.log("Document data:", docSnapshot.data());
                dispatch(fillUserSync({ user: docSnapshot.data() }));
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}


export const fillUserSync = (params) => {
    return {
        type: typesUser.fillUser,
        payload: {
            user: params.user
        }
    }
}