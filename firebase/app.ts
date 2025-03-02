import { initializeApp } from 'firebase/app';
import {getDatabase} from 'firebase/database';
import { collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDLI7FUzEqyXIf9zjNw65cZl4jENSacJ9g",
  authDomain: "grocery-store-3905f.firebaseapp.com",
  databaseURL: "https://grocery-store-3905f-default-rtdb.firebaseio.com",
  projectId: "grocery-store-3905f",
  storageBucket: "grocery-store-3905f.firebasestorage.app",
  messagingSenderId: "459690526631",
  appId: "1:459690526631:web:57ebeec1bd09bdbb0a5882"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app)

export {database}



