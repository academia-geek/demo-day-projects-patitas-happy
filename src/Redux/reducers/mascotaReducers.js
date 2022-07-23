import { typesMascotas } from "../types/types";
import { sizesMascotas, personalidadMascotas, tipoMascotas, generoMascotas } from '../../assets/DatosMascotas';

const initialState = {
    mascotas: [],
    filters: {
        'Género': { color: 'cyan', values: generoMascotas },
        'Tipo': { color: 'cyan', values: tipoMascotas },
        'Tamaño': { color: 'cyan', values: sizesMascotas },
        'Personalidades': { isMultiple: true, color: 'cyan', values: personalidadMascotas }
    },
    appliedFilters: []
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
                    ciudad: action.payload.ciudad,
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
                        originalItem.ciudad = action.payload.ciudad;
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
                ...state,
                mascotas: [...action.payload.mascotas]
            }
        case typesMascotas.fillMascota:
            return {
                ...state,
                mascota: action.payload.mascota
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
        case typesMascotas.selectedFilter:
            return {
                ...state,
                selectedFilters: { key: action.payload.category, ...state.filters[action.payload.category] }
            }
        case typesMascotas.appliedFilters:
            const category = action.payload.category;
            const alreadyApplied = state.appliedFilters.some(af => Object.keys(af)[0] === category);

            let newFilterApplied = [];
            if (alreadyApplied) {
                newFilterApplied = state.appliedFilters.map(af => {
                    let current = af;
                    const key = Object.keys(af)[0];
                    if (key === category) {
                        const values = af[key].isMultiple ? [...action.payload.selectedValue] : [action.payload.selectedValue];
                        current = {
                            [category]: {
                                ...af[key],
                                values
                            }
                        }
                    }

                    return current;
                });
            } else {
                // console.log(action.payload.selectedValue);
                newFilterApplied = [...state.appliedFilters, {
                    [category]: {
                        ...state.filters[category],
                        values: [action.payload.selectedValue]
                    }
                }];
            }

            return {
                ...state,
                appliedFilters: newFilterApplied
            }
        default:
            return state;
    }
}