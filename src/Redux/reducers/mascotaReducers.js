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
        case typesMascotas.updateMascota:
            return {
                ...state,
                mascotas: state.mascotas.map(mascota => {
                    const originalItem = mascota;
                    if (mascota.firestoreId === action.payload.firestoreId) {
                        originalItem.tipo = action.payload.tipo;
                        originalItem.nombre = action.payload.nombre;
                        originalItem.edad = action.payload.edad;
                        originalItem.fechaRescate = action.payload.fechaRescate;
                        originalItem.fechaNacimiento = action.payload.fechaNacimiento;
                        originalItem.genero = action.payload.genero;
                        originalItem.vacunas = action.payload.vacunas;
                        originalItem.ultimaDesparasitacion = action.payload.ultimaDesparasitacion;
                        originalItem.ubicacion = action.payload.ubicacion;
                        originalItem.enfermedad = action.payload.enfermedad;
                        originalItem.condiciones = action.payload.condiciones;
                        originalItem.otrasCondiciones = action.payload.otrasCondiciones;
                        originalItem.imagen = action.payload.imagen;
                    }

                    return originalItem
                })
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