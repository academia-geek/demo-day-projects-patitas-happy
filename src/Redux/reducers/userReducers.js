import { typesRegister, typesUser } from "../types/types"

export const userReducers = (state = {}, action) => {
    switch (action.type) {
        case typesRegister.register:
            return {
                id: action.payload.id,
                fullname: action.payload.fullname,
                email: action.payload.email,
                fecha: action.payload.fecha,
                password: action.payload.password,
                phoneNumber: action.payload.phoneNumber,
                error: action.payload.error
            }

        case typesRegister.clear:
            return {

            }
        case typesUser.list:
            return {
                ...action.payload
            }
        default:
            return state
    }
}