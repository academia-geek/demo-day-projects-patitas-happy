import { typesMascotas } from "../types/types";
import { collection, addDoc, query, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dataBase } from "../../Firebase/firebaseConfig"

const collectionName = "mascotas";

export const addMascotaAsync = (mascota) => {
    return async (dispatch) => {
        try {
            const docRef = await addDoc(collection(dataBase, collectionName), mascota);
            dispatch(addMascotaSync({ id: docRef.id, ...mascota }));
            dispatch(errorSync({ error: false }));
        } catch (error) {
            console.log(error);
            dispatch(errorSync({ error: true }));
        }
    }
}

export const addMascotaSync = (mascota) => {
    return {
        type: typesMascotas.addMascota,
        payload: {
            tipo: mascota.tipo,
            nombre: mascota.nombre,
            edad: mascota.edad,
            fechaRescate: mascota.fechaRescate,
            fechaNacimiento: mascota.fechaNacimiento,
            genero: mascota.genero,
            vacunas: mascota.vacunas,
            ultimaDesparasitacion: mascota.ultimaDesparasitacion,
            ciudad: mascota.ciudad,
            ubicacion: mascota.ubicacion,
            enfermedad: mascota.enfermedad,
            condiciones: mascota.condiciones,
            otrasCondiciones: mascota.otrasCondiciones,
            imagen: mascota.imagen
        }
    }
}


export const updateMascotaAsync = (mascota) => {
    return async (dispatch) => {
        try {
            const docRef = doc(dataBase, collectionName, mascota.firestoreId);
            updateDoc(docRef, mascota)
              .then(() => {
                dispatch(updateMascotaSync({ firestoreId: docRef.id, ...mascota }));
                dispatch(errorSync({ error: false }));
              })
              .catch(error => {
                console.log(error);
                dispatch(errorSync({ error: true }));
              });
           
        } catch (error) {
            console.log(error);
            dispatch(errorSync({ error: true }));
        }
    }
}

export const updateMascotaSync = (mascota) => {
    return {
        type: typesMascotas.updateMascota,
        payload: {
            firestoreId: mascota.firestoreId,
            tipo: mascota.tipo,
            nombre: mascota.nombre,
            edad: mascota.edad,
            fechaRescate: mascota.fechaRescate,
            fechaNacimiento: mascota.fechaNacimiento,
            genero: mascota.genero,
            vacunas: mascota.vacunas,
            ultimaDesparasitacion: mascota.ultimaDesparasitacion,
            ciudad: mascota.ciudad,
            ubicacion: mascota.ubicacion,
            enfermedad: mascota.enfermedad,
            condiciones: mascota.condiciones,
            otrasCondiciones: mascota.otrasCondiciones,
            imagen: mascota.imagen
        }
    }
}

export const errorSync = (params) => {
    return {
        type: typesMascotas.throwError,
        payload: {
            error: params.error
        }
    }
}

export const fillMascotasAsync = () => {
    return (dispatch) => {
        const collectionMascotas = collection(dataBase, collectionName);
        const querySnapshot = query(collectionMascotas);
        getDocs(querySnapshot)
            .then((documents) => {
                const data = [];
                documents.forEach((document) => {
                    data.push({
                        firestoreId: document.id,
                        ...document.data(),
                    });
                });

                dispatch(
                    fillMascotasSync({
                        mascotas: data
                    }, false)
                );
            })
            .catch((error) => {
                console.log(error);
                dispatch(fillMascotasSync({}, true));
            });
    }
}

export const fillMascotasSync = (params) => {
    return {
        type: typesMascotas.fillMascotas,
        payload: {
            mascotas: params.mascotas
        }
    }
}

export const deleteMascotaAsync = (params) => {
    return (dispatch) => {
        deleteDoc(doc(dataBase, collectionName, params.id))
            .then(() => {
                dispatch(deleteMascotaSync({ id: params.id }));
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export const deleteMascotaSync = (params) => {
    return {
        type: typesMascotas.deleteMascota,
        payload: {
            id: params.id
        }
    }
}