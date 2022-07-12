import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCvePqO3Vl93l6__iEgoj7foHocKLr3EWo",
  authDomain: "proyecto-patitas-happy.firebaseapp.com",
  projectId: "proyecto-patitas-happy",
  storageBucket: "proyecto-patitas-happy.appspot.com",
  messagingSenderId: "828065303415",
  appId: "1:828065303415:web:af2b806c70f697612a6f72"
};


const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const dataBase = getFirestore(app);
export const google = new GoogleAuthProvider()
export const facebook = new FacebookAuthProvider();

export default app