import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "@firebase/firestore";
import { dataBase } from "../../Firebase/firebaseConfig";
import { typesRequest } from "../types/types";

const collectionName = "solicitudes";

//---Acciones sícrona y asíncrona para agregar solicitudes---

export const addRequestAsync = (solicitud) => {
    return async (dispatch) => {
        try {
            const docRef = await addDoc(collection(dataBase, collectionName), solicitud);
            dispatch(addRequestSync({ solicitud: { idSolicitud: docRef.id, ...solicitud } }));
            dispatch(errorSync({ error: false }));
        } catch (error) {
            console.log(error);
            dispatch(errorSync({ error: true }));
        }

    }
}

export const addRequestSync = (params) => {
    return {
        type: typesRequest.addRequest,
        payload: {
            solicitud: params.solicitud
        }
    }
}

export const errorSync = (params) => {
    return {
        type: typesRequest.throwErrorRequest,
        payload: {
            error: params.error,
            message: params.message
        }
    }
}

//---Acciones síncrona y asíncrona para listar o llamar a la colección 'solicitudes'

export const fillSolicitudesUsuarioAsync = (idMascota, idUser) => {
    return (dispatch) => {
        const collectionSolicitudes = collection(dataBase, collectionName);
        const querySnapshot = query(collectionSolicitudes,
            where("idMascota", "==", idMascota),
            where("idUser", "==", idUser),
            where("tipoSolicitud", "==", "visita")
        );
        getDocs(querySnapshot)
            .then((documents) => {
                const data = [];
                documents.forEach((document) => {
                    data.push({
                        idSolicitudes: document.id,
                        ...document.data(),
                    });
                });

                dispatch(
                    fillSolicitudesUsuarioSync({
                        solicitudesUsuario: data
                    })
                );
            })
            .catch((error) => {
                console.log(error);
                dispatch(errorSync({ error: true }));
            });
    }

}

export const fillSolicitudesUsuarioSync = (params) => {
    return {
        type: typesRequest.fillUserRequests,
        payload: {
            solicitudesUsuario: params.solicitudesUsuario
        }

    }
}

export const fillRequestsAsync = () => {
    return (dispatch) => {
        const collectionSolicitudes = collection(dataBase, collectionName);
        const querySnapshot = query(collectionSolicitudes);
        getDocs(querySnapshot)
            .then((documents) => {
                const data = [];
                documents.forEach((document) => {
                    data.push({
                        idSolicitud: document.id,
                        ...document.data(),
                    });
                });

                dispatch(
                    fillRequestsSync({
                        solicitudes: data
                    })
                );
            })
            .catch((error) => {
                console.log(error);
                dispatch(errorSync({ error: true }));
            });
    }
}


export const fillRequestsSync = (params) => {
    return {
        type: typesRequest.fillRequests,
        payload: {
            solicitudes: params.solicitudes
        }
    }
}

export const fillRequestAsync = (idSolicitud) => {
    return (dispatch) => {
        const docRef = doc(dataBase, collectionName, idSolicitud);
        getDoc(docRef).then(docSnapshot => {
            if (docSnapshot.exists()) {
                // console.log("Document data:", docSnapshot.data());
                dispatch(fillRequestSync({ solicitud: docSnapshot.data() }));
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}


export const fillRequestSync = (params) => {
    return {
        type: typesRequest.fillRequest,
        payload: {
            solicitud: params.solicitud
        }
    }
}

export const updateRequestAsync = (request) => {
    return (dispatch) => {
        const docRef = doc(dataBase, collectionName, request.firestoreId);
        updateDoc(docRef, request)
            .then(() => {
                dispatch(updateRequestSync({ status: request.status, causasCancelacion: request.causasCancelacion, canceledBy: request.canceledBy }));
                dispatch(errorSync({ error: false, message: 'Has actualizado el status correctamente!' }));
            })
            .catch(error => {
                console.log(error);
                dispatch(errorSync({ error: true, message: error.message }));
            });
    }
}

export const updateRequestSync = (request) => {
    return {
        type: typesRequest.updateRequest,
        payload: {
            status: request.status,
            causasCancelacion: request.causasCancelacion,
            canceledBy: request.canceledBy
        }
    }
}