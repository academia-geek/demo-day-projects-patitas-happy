import { collection, query, where, getDocs } from "firebase/firestore";
import { dataBase } from "../Firebase/firebaseConfig";


export const getUserFromDatabase = (email) => {
    return new Promise((resolve, reject) => {
        try {
            const collectionUsers = collection(dataBase, "users");
            const querySnapshot = query(collectionUsers, where("email", "==", email));
            getDocs(querySnapshot).then(documents => {
                documents.forEach((document) => {
                    return resolve({
                        id: document.id,
                        ...document.data()
                    });
                });
            })
        } catch (error) {
            return reject(error);
        }
    })
}