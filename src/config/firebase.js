import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAh-SCRa4_PToRqkrcmIevN_ZI_XW5FTX8",
    authDomain: "markdown-ea1d2.firebaseapp.com",
    projectId: "markdown-ea1d2",
    storageBucket: "markdown-ea1d2.appspot.com",
    messagingSenderId: "249434328267",
    appId: "1:249434328267:web:cf64ec29619285ee305f4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db }
