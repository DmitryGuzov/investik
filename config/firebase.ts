// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, getDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyClD0AfJqzdaUyaq_2aATbeoXsG-Vp8yc4',
  authDomain: 'investik-fa910.firebaseapp.com',
  projectId: 'investik-fa910',
  storageBucket: 'investik-fa910.appspot.com',
  messagingSenderId: '942240734365',
  appId: '1:942240734365:web:f69b42bfa183e352ae4874',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebase = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
// const db = firebase.firestore();
export { auth, db, app };
