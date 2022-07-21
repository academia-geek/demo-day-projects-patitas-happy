import { typesAdopcion, typesApadrinar } from "../types/types"


export const addAdopcionSync = (formValue) => {
    return {
        type: typesAdopcion.add,
        payload: { formValue }
    }
}

export const addApadrinarSync = (opcion) => {
    return {
        type: typesApadrinar.add,
        payload: { opcion }
    }
}