import { typesMascotas } from "../types/types";
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import { dataBase } from "../../Firebase/firebaseConfig"

const collectionName = "mascotas";

export const addMascotaAsync = (mascota) => {
    return async (dispatch) => {
        try {
            const docRef = await addDoc(collection(dataBase, collectionName), mascota);
            dispatch(addMascotaSync({ id: docRef.id, ...mascota }, false));
        } catch (error) {
            console.log(error);
            dispatch(addMascotaSync({}, true));
        }
    }
}

export const addMascotaSync = (mascota, error) => {
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
            ubicacion: mascota.ubicacion,
            enfermedad: mascota.enfermedad,
            condiciones: mascota.condiciones,
            otrasCondiciones: mascota.otrasCondiciones,
            imagen: mascota.imagen,
            error
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