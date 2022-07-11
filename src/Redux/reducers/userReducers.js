import { typesUser } from "../types/types"

export const userReducers = (state = {}, action) => {
    switch (action.type) {
        case typesUser.register:
            return {
                nombre: action.payload.nombre,
                email: action.payload.email,
                fecha: action.payload.fecha,
                telefono: action.payload.telefono,
                pass: action.payload.pass
            }
    
        default:
            return state
    }
}