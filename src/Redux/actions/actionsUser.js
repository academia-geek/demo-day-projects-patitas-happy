import { typesUser } from "../types/types"


export const registerUserSync = (nombre, email, fecha, telefono, pass) => {
    return {
        type: typesUser.register,
        payload: {
            nombre, email, fecha, telefono, pass
        }
    }
}