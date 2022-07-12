import { typesLogin } from "../types/types";

export const loginReducers = (state = {}, action) => {
    switch (action.type) {
        case typesLogin.login:
            return {
                email: action.payload.email,
                password: action.payload.password,
                displayName: action.payload.displayName,
                accessToken: action.payload.accessToken,
                photoURL: action.payload.photoURL,
                phoneNumber: action.payload.phoneNumber,
                error: action.payload.error
            }
        case typesLogin.authenticated:
            return {
                ...state,
                error: undefined,
                authenticated: true
            }
        case typesLogin.logout:
            return {
                authenticated: false
            }

        default:
            return state
    }
};