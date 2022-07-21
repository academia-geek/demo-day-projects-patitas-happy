import { typesLogin } from "../types/types";

export const loginReducers = (state = {}, action) => {
    switch (action.type) {
        case typesLogin.login:
            return {
                id: action.payload.id,
                email: action.payload.email,
                password: action.payload.password,
                displayName: action.payload.displayName,
                accessToken: action.payload.accessToken,
                photoURL: action.payload.photoURL,
                phoneNumber: action.payload.phoneNumber,
                fullName: action.payload.fullName,
                admin: action.payload.admin,
                fecha: action.payload.fecha,
                error: action.payload.error
            }
        case typesLogin.authenticated:
            return {
                ...state,
                error: undefined,
                errorGaF: undefined,
                authenticated: true
            }
        case typesLogin.logout:
            return {
                authenticated: false
            }
        case typesLogin.loginGoogleAndFacebook:
            return {
                email: action.payload.email,
                displayName: action.payload.displayName,
                accessToken: action.payload.accessToken,
                photoURL: action.payload.photoURL,
                phoneNumber: action.payload.phoneNumber,
                errorGoF: action.payload.error
            }
        case typesLogin.load:
            return {
                id: action.payload.id,
                email: action.payload.email,
                password: action.payload.password,
                displayName: action.payload.displayName,
                accessToken: action.payload.accessToken,
                photoURL: action.payload.photoURL,
                phoneNumber: action.payload.phoneNumber,
                fullName: action.payload.fullName,
                admin: action.payload.admin,
                fecha: action.payload.fecha,
                error: action.payload.error
            }
        default:
            return state
    }
};