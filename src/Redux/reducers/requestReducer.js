import { typesRequest } from "../types/types";


const initialState = {
    solicitudesUsuario: [],
    solicitudes: [],
    solicitud: null,
    appliedFilter: null
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
                error: action.payload.error,
                message: action.payload.message
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
        case typesRequest.updateRequest:
            return {
                ...state,
                solicitud: {
                    ...state.solicitud,
                    status: action.payload.status,
                    causasCancelacion: action.payload.causasCancelacion,
                    canceledBy: action.payload.canceledBy
                }
            }
        case typesRequest.appliedFilter:
            return {
                ...state,
                appliedFilter: action.payload.tipoSolicitud
            }
        case typesRequest.removeAppliedFilter:
            return {
                ...state,
                appliedFilter: null
            }
        default:
            return state
    }

}