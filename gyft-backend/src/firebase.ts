import admin from 'firebase-admin';
import ServiceAccount from '../firebase-service-account.json';


admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount as admin.ServiceAccount),
    databaseURL: "https://gyft-ff7b6.firebaseio.com",
})

import { initializeApp as clientInitializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: 'gyft-ff7b6.firebaseapp.com',
    projectId: 'gyft-ff7b6',
    storageBucket: 'gyft-ff7b6.appspot.com',
    messagingSenderId: '932237502811',
    appId: "1:932237502811:web:d7ac508dd8d0c81911d27e",
    measurementId: "G-Q9GZSRBR2N"
}

const firebaseApp = clientInitializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp)

export { admin, firebaseAuth }