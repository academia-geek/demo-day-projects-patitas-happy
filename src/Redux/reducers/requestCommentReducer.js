import { typesCommentRequest } from "../types/types";


const initialState = {
    comentarioSolicitudes: [],
    comentario: null
}

export const requestCommentReducer = (state = initialState, action) => {
    switch (action.type) {
        case typesCommentRequest.addCommentRequest:
            return {
                ...state,
                comentarioSolicitudes: [...state.comentarioSolicitudes, {
                    ...action.payload.comentarioSolicitud
                }]
            };
        case typesCommentRequest.throwErrorRequest:
            return {
                ...state,
                error: action.payload.error,
                message: action.payload.message
            }
        case typesCommentRequest.fillCommentRequests:
            return {
                ...state,
                comentarioSolicitudes: action.payload.comentarioSolicitudes
            }
        default:
            return state
    }

}