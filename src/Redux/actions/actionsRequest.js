import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { dataBase } from "../../Firebase/firebaseConfig";
import { typesRequest } from "../types/types";

const collectionName = "solicitudes";

//---Acciones sícrona y asíncrona para agregar solicitudes---

export const addRequestAsync = (solicitud) => {
    return async (dispatch) => {
        try {
            const docRef = await addDoc(collection(dataBase, collectionName), solicitud);
            dispatch(addRequestSync({ idSolicitud: docRef.id, ...solicitud }));
            dispatch(errorSync({ error: false }));
        } catch (error) {
            console.log(error);
            dispatch(errorSync({ error: true }));
        }

    }
}

export const addRequestSync = (solicitud) => {
    return {
        type: typesRequest.addRequest,
        payload: { ...solicitud }
    }
}

export const errorSync = (params) => {
    return {
        type: typesRequest.throwErrorRequest,
        payload: {
            error: params.error
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