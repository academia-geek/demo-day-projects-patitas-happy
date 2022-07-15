import { typesForm } from "../types/types";

const initialState = {
  form: [],
};

export const formReducers = (state = initialState, action) => {
  switch (action.type) {
    case typesForm.adopcion:
      return {
        adopcion: [action.payload],
      };
    case typesForm.encontrado:
      return {
        encontrado: [action.payload],
      };
    default:
      return state;
  }
};
