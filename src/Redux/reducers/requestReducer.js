import { typesRequest } from "../types/types";


const initialState = {
    solicitudesUsuario: []
}

export const requestReducer = (state = initialState, action) => {
    switch (action.type) {
        case typesRequest.addRequest:

            return {
                solicitudesUsuario: [...state.solicitudesUsuario, {
                    ...action.payload
                }]
            };
        case typesRequest.throwErrorRequest:
            return {
                ...state,
                error: action.payload.error
            }
        case typesRequest.fillUserRequests:
            return {
                solicitudesUsuario: action.payload.solicitudesUsuario
            }

        default:
            return state
    }

}