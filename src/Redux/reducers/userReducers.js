import { typesUser } from "../types/types"

const initialState = {
    users: []
}

export const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case typesUser.register:
            return {
                id: action.payload.id,
                fullname: action.payload.fullname,
                email: action.payload.email,
                fecha: action.payload.fecha,
                password: action.payload.password,
                phoneNumber: action.payload.phoneNumber,
                accessToken: action.payload.accessToken,
                error: action.payload.error,
                admin: action.payload.admin,
                provider: action.payload.provider
            }
        case typesUser.clear:
            return {

            }
        case typesUser.list:
            return {
                ...state,
                users: action.payload.users
            }
        case typesUser.edit:
            return {
                ...action.payload
            }
        case typesUser.fillUser:
            return {
                ...state,
                user: action.payload.user
            }
        default:
            return state
    }
}