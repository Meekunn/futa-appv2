import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBcJaAphV6y8WA1Y1q1EuDanCD5L5ygYNY",
    authDomain: "my-app-e4b5c.firebaseapp.com",
    projectId: "my-app-e4b5c",
    storageBucket: "my-app-e4b5c.appspot.com",
    messagingSenderId: "244094676353",
    appId: "1:244094676353:web:837586e50b154b32724c80",
    measurementId: "G-FHGB5DYQNS",
}

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);