import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // or use Realtime Database

const firebaseConfig = {
    apiKey: "AIzaSyDSPj8LzBe2em10Yc1IUssqpgv_MDBFT7A",
    authDomain: "scholalyst.firebaseapp.com",
    projectId: "scholalyst",
    storageBucket: "scholalyst.firebasestorage.app",
    messagingSenderId: "482779555408",
    appId: "1:482779555408:web:f8940a5a91670ad9095355",
    measurementId: "G-1SJ2KWKQP9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
