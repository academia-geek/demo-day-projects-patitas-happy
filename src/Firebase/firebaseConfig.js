import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyA68pgQtMCMnAnpfoV-9UyO3GQ0tn8PclQ",
  authDomain: "patitas-happy.firebaseapp.com",
  projectId: "patitas-happy",
  storageBucket: "patitas-happy.appspot.com",
  messagingSenderId: "656274254735",
  appId: "1:656274254735:web:3116bd406292f32f86f9fa"
};


const app = initializeApp(firebaseConfig);

export default app;