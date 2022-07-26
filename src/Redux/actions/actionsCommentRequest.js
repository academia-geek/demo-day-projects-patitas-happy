import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { dataBase } from "../../Firebase/firebaseConfig";
import { typesCommentRequest } from "../types/types";

const collectionName = "comentarioSolicitudes";

export const addCommentRequestAsync = (comentarioSolicitud) => {
    return async (dispatch) => {
        try {
            const docRef = await addDoc(collection(dataBase, collectionName), comentarioSolicitud);
            dispatch(addCommentRequestSync({ comentarioSolicitud: { idSolicitud: docRef.id, ...comentarioSolicitud } }));
            dispatch(errorSync({ error: false }));
        } catch (error) {
            console.log(error);
        }
    }
}

export const addCommentRequestSync = (params) => {
    return {
        type: typesCommentRequest.addCommentRequest,
        payload: {
            comentarioSolicitud: params.comentarioSolicitud
        }
    }
}

export const fillComentarioSolicitudesAsync = (idSolicitud) => {
    return (dispatch) => {
        const collectionSolicitudes = collection(dataBase, collectionName);
        const querySnapshot = query(collectionSolicitudes,
            where("idSolicitud", "==", idSolicitud),
        );
        getDocs(querySnapshot)
            .then((documents) => {
                const data = [];
                documents.forEach((document) => {
                    data.push({
                        idComentarioSolicitud: document.id,
                        ...document.data(),
                    });
                });

                dispatch(
                    fillComentarioSolicitudesSync({
                        comentarioSolicitudes: data
                    })
                );
            })
            .catch((error) => {
                console.log(error);
                dispatch(errorSync({ error: true }));
            });
    }
}

export const fillComentarioSolicitudesSync = (params) => {
    return {
        type: typesCommentRequest.fillCommentRequests,
        payload: {
            comentarioSolicitudes: params.comentarioSolicitudes
        }

    }
}

export const errorSync = (params) => {
    return {
        type: typesCommentRequest.throwErrorRequest,
        payload: {
            error: params.error,
            message: params.message
        }
    }
}
