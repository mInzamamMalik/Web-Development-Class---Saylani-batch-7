
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBLnR4qGyMaexD_yf5p5ppWBXcI6xEiJZg",
    authDomain: "saylani-class-delete-this.firebaseapp.com",
    projectId: "saylani-class-delete-this",

    storageBucket: "saylani-class-delete-this.appspot.com",
    messagingSenderId: "698514861499",
    appId: "1:698514861499:web:47b0a85aba461d5a23689e"
};
initializeApp(firebaseConfig)

export const db = getFirestore();

