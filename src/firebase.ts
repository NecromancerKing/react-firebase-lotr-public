import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, setDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

// fill the service account config here
const config = {
    
};

// Initialize Firebase
const app = initializeApp(config);
const db = getFirestore(app);

export {db, collection, doc, getDocs, setDoc, updateDoc, deleteDoc, onSnapshot};