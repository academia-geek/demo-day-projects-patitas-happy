import { typesUser } from "../types/types";

const initialState = {
    users: []
}

export const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case typesUser.login:
            return {
                id: action.payload.id,
                email: action.payload.email,
                password: action.payload.password,
                displayName: action.payload.displayName,
                accessToken: action.payload.accessToken,
                photoURL: action.payload.photoURL,
                phoneNumber: action.payload.phoneNumber,
                fullname: action.payload.fullname,
                admin: action.payload.admin,
                fecha: action.payload.fecha,
                error: action.payload.error,
                provider: action.payload.provider
            }
        case typesUser.authenticated:
            return {
                ...state,
                error: undefined,
                errorGaF: undefined,
                authenticated: true
            }
        case typesUser.logout:
            return {
                authenticated: false
            }
        case typesUser.loginGoogleAndFacebook:
            return {
                email: action.payload.email,
                displayName: action.payload.displayName,
                accessToken: action.payload.accessToken,
                photoURL: action.payload.photoURL,
                phoneNumber: action.payload.phoneNumber,
                provider: action.payload.provider,
                errorGoF: action.payload.error
            }
        case typesUser.load:
            return {
                id: action.payload.id,
                email: action.payload.email,
                password: action.payload.password,
                displayName: action.payload.displayName,
                accessToken: action.payload.accessToken,
                photoURL: action.payload.photoURL,
                phoneNumber: action.payload.phoneNumber,
                fullname: action.payload.fullname,
                admin: action.payload.admin,
                fecha: action.payload.fecha,
                provider: action.payload.provider,
                error: action.payload.error
            }
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
                admin: action.payload.admin
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
};