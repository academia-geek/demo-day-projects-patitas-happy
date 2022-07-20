import { typesApadrinar } from "../types/types"

export const apadrinarReducers = (state = {}, action) => {
    switch (action.type) {
        case typesApadrinar.add:
            return {
                opcion: action.payload.opcion
            }
        

        default:
           return state
    }
}