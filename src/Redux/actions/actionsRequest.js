import { addDoc, collection } from "@firebase/firestore";
import { dataBase } from "../../Firebase/firebaseConfig";
import { typesRequest } from "../types/types";

const collectionName = "solicitudes";

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
        payload: {...solicitud}
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