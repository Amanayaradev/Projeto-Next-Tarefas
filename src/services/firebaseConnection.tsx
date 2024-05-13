import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcq0-EFAfmETK6AnHOG3aDowqEbh-QwVc",
  authDomain: "tarefa-8e2d9.firebaseapp.com",
  projectId: "tarefa-8e2d9",
  storageBucket: "tarefa-8e2d9.appspot.com",
  messagingSenderId: "481558120054",
  appId: "1:481558120054:web:919c41823cc3c1ba3a4157"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };