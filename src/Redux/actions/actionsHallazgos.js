import { dataBase } from "../../Firebase/firebaseConfig";
import { getDocs, collection } from "@firebase/firestore";
import { typesForm } from "../types/types";

export const getDataHallazgosAsync = () => {
  return async dispatch => {
    const Fcollection = await getDocs(collection(dataBase, "formEncontrado"));
    const encontrados = [];
    Fcollection.forEach(listar => {
      encontrados.push({
        ...listar.data(),
      });
    });
    dispatch(getDataHallazgosSync(encontrados));
  };
};

export const getDataHallazgosSync = hallazgos => {
  return {
    type: typesForm.encontradoget,
    payload: hallazgos,
  };
};
