
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCdLjxezxSJ3hHNjoQ4L0QLY1dohdSD_oM",
    authDomain: "ecommerce-2fbcb.firebaseapp.com",
    projectId: "ecommerce-2fbcb",
    storageBucket: "ecommerce-2fbcb.appspot.com",
    messagingSenderId: "746486198725",
    appId: "1:746486198725:web:31cbbd6d6cdd1b8ddbdbac",
    measurementId: "G-7ZCZZ4RC6R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { app, db, auth, storage, database, ref, set, push, onValue, createUserWithEmailAndPassword, signInWithEmailAndPassword, collection, addDoc, getDocs, setDoc, doc };