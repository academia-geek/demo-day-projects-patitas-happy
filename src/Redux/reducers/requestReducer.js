import { typesRequest } from "../types/types";


const initialState = {
    solicitudesUsuario: [],
    solicitudes: [],
}

export const requestReducer = (state = initialState, action) => {
    switch (action.type) {
        case typesRequest.addRequest:
            return {
                ...state,
                solicitudesUsuario: [...state.solicitudesUsuario, {
                    ...action.payload.solicitud
                }]
            };
        case typesRequest.throwErrorRequest:
            return {
                ...state,
                error: action.payload.error
            }
        case typesRequest.fillUserRequests:
            return {
                ...state,
                solicitudesUsuario: action.payload.solicitudesUsuario
            }
        case typesRequest.fillRequests:
            return {
                ...state,
                solicitudes: action.payload.solicitudes
            }
        case typesRequest.fillRequest:
            return {
                ...state,
                solicitud: action.payload.solicitud
            }
        default:
            return state
    }

}