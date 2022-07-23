import { typesMascotas } from "../types/types";
import { collection, addDoc, query, getDocs, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
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

export const fillMascotaAsync = (firestoreId) => {
    return (dispatch) => {
        const docRef = doc(dataBase, collectionName, firestoreId);
        getDoc(docRef).then(docSnapshot => {
            if (docSnapshot.exists()) {
                // console.log("Document data:", docSnapshot.data());
                dispatch(fillMascotaSync(docSnapshot.data(), false));
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(error => {
            console.log(error);
            dispatch(fillMascotaSync({}, false));
        });
    }
}

export const fillMascotaSync = (mascota, error) => {
    return {
        type: typesMascotas.fillMascota,
        payload: {
            mascota,
            error: error
        }
    }
}

export const selectedFilter = (params) => {
    return {
        type: typesMascotas.selectedFilter,
        payload: {
            category: params.category
        }
    }
}

export const appliedFilters = (params) => {
    return {
        type: typesMascotas.appliedFilters,
        payload: {
            category: params.category,
            selectedValue: params.selectedValue
        }
    }
}

