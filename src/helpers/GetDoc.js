import { collection, query, where, getDocs } from "firebase/firestore";
import { dataBase } from "../Firebase/firebaseConfig";


export const getUserFromDatabase = (email) => {
    return new Promise((resolve, reject) => {
        try {
            const collectionUsers = collection(dataBase, "users");
            const querySnapshot = query(collectionUsers, where("email", "==", email));
            getDocs(querySnapshot)
                .then(documents => {
                    documents.forEach((document) => {
                        return resolve({
                            id: document.id,
                            ...document.data()
                        });
                    });

                    return resolve({});
                });
        } catch (error) {
            console.log(error);
            return reject(error);
        }
    })
}

export const getDocFromDatabase = (item = {}, nameCollection) => {
    return new Promise((resolve, reject) => {
        try {
            const collectionUsers = collection(dataBase, nameCollection);
            const querySnapshot = query(collectionUsers, where(item.label, "==", item.value));
            getDocs(querySnapshot)
                .then(documents => {
                    documents.forEach((document) => {
                        return resolve({
                            id: document.id,
                            ...document.data()
                        });
                    });

                    return resolve({});
                });
        } catch (error) {
            console.log(error);
            return reject(error);
        }
    })
}