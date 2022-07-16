import { addDoc, collection } from "@firebase/firestore";
import { dataBase } from "../../Firebase/firebaseConfig";
import { typesForm } from "../types/types";

export const AddAdopcionAsync = form => {
  return async dispatch => {
    addDoc(collection(dataBase, "formDarEnAdopcion"), form)
      .then(resp => dispatch(AddAdopcionSync(form)))
      .catch(error => console.warn(error));
  };
};
export const AddAdopcionSync = form => {
  return {
    type: typesForm.adopcion,
    payload: form,
  };
};
