import { typesMascotas } from "../types/types";

const initialState = {
    mascotas: []
}

export const mascotasReducers = (state = initialState, action) => {
    switch (action.type) {
        case typesMascotas.addMascota:
            return {
                mascotas: [...state.mascotas, {
                    tipo: action.payload.tipo,
                    nombre: action.payload.nombre,
                    edad: action.payload.edad,
                    fechaRescate: action.payload.fechaRescate,
                    fechaNacimiento: action.payload.fechaNacimiento,
                    genero: action.payload.genero,
                    vacunas: action.payload.vacunas,
                    ultimaDesparasitacion: action.payload.ultimaDesparasitacion,
                    ubicacion: action.payload.ubicacion,
                    enfermedad: action.payload.enfermedad,
                    condiciones: action.payload.condiciones,
                    otrasCondiciones: action.payload.otrasCondiciones,
                    imagen: action.payload.imagen,
                }]
            }
        case typesMascotas.fillMascotas:
            return {
                mascotas: action.payload.mascotas
            }
        case typesMascotas.deleteMascota:
            return {
                ...state,
                mascotas: state.mascotas.filter(
                    (mascota) => mascota.firestoreId !== action.payload.id
                ),
            };
        case typesMascotas.throwError:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}