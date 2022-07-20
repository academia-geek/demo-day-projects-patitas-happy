import { typesAdopcion, typesApadrinar } from "../types/types";

export const solicitudesReducers = (state = {}, action) => {
    switch (action.type) {
        case typesAdopcion.add:
            return {
                
                ciudad: action.payload.ciudad,
                direccion: action.payload.direccion,
                genero: action.payload.genero,
                estabilidad: action.payload.estabilidad,
                descripcion: action.payload.descripcion
            }
        

        default:
           return state
    }
}