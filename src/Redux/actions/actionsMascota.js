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
                    })
                );
            })
            .catch((error) => {
                console.log(error);
                dispatch(fillMascotasSync({ mascotas: [] }));
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

export const filterMascotasAsync = (params) => {
    return (dispatch) => {
        const collectionMascotas = collection(dataBase, collectionName);
        const querySnapshot = query(collectionMascotas);
        getDocs(querySnapshot)
            .then((documents) => {
                let mascotas = [];
                documents.forEach((document) => {
                    mascotas.push({
                        firestoreId: document.id,
                        ...document.data(),
                    });
                });

                const filters = params.filters;
                let filterToApply = filters.find(filter => filter.key === "Género")
                if (filterToApply) {
                    mascotas = mascotas.filter(item => item['genero'] && item['genero'].toLowerCase() === filterToApply.values[0].toLowerCase());
                }

                filterToApply = filters.find(f => f.key === "Tipo");
                if (filterToApply) {
                    mascotas = mascotas.filter(item => item['tipo'] && item['tipo'].toLowerCase() === filterToApply.values[0].toLowerCase());
                }

                filterToApply = filters.find(f => f.key === "Tamaño");
                if (filterToApply) {
                    mascotas = mascotas.filter(item => item['tamano'] && item['tamano'].toLowerCase() === filterToApply.values[0].toLowerCase());
                }

                filterToApply = filters.find(f => f.key === "Vivienda");
                if (filterToApply) {
                    if (filterToApply.values[0] === 'Apartamento') {
                        mascotas = mascotas.filter(item => item['tamano'] && item['tamano'].toLowerCase() === "pequeño");
                    } else {
                        mascotas = mascotas.filter(item => item['tamano'] && item['tamano'].toLowerCase() !== "pequeño");
                    }
                }

                filterToApply = filters.find(f => f.key === "Apto para");
                if (filterToApply) {
                    const value = filterToApply.values[0];
                    let correspondencia = [];

                    if (value === 'Niños') {
                        correspondencia = [
                            'Cariñoso',
                            'Protector',
                            'Jugueton',
                            'Cuidador'
                        ];
                    }

                    if (value === 'Discapacitados') {
                        correspondencia = [
                            'Entrenado',
                            'Protector',
                            'Cuidador',
                            'Tranquilo',
                        ];
                    }

                    mascotas = mascotas.filter(item => item['personalidad'] && item['personalidad'].every(personalidad => correspondencia.includes(personalidad)));
                }

                filterToApply = filters.find(f => f.key === "Personalidades");
                if (filterToApply && filterToApply.values && filterToApply.values.length) {
                    filterToApply.values = filterToApply.values.map(item => item.toString());
                    mascotas = mascotas.filter(item => item['personalidad'] && item['personalidad'].some(personalidad => filterToApply.values.includes(personalidad)));
                }

                dispatch(fillMascotasSync({ mascotas }));
            })
            .catch((error) => {
                console.log(error);
                dispatch(fillMascotasSync({ mascotas: [] }));
            });
    }
}

export const removeAppliedFilter = (params) => {
    return {
        type: typesMascotas.removeAppliedFilter,
        payload: {
            filter: params.filter
        }
    }
}