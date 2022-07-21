import { typesRequest } from "../types/types";


const initialState = {
    solicitudes: []
}

export const requestReducer = (state = initialState, action) => {
    switch (action.type) {
        case typesRequest.addRequest:

            return {
                solicitudes: [...state.solicitudes, {
                    ...action.payload
                }]
            };
        case typesRequest.throwErrorRequest:
            return {
                ...state,
                error: action.payload.error
            }

        default:
            return state
    }

}