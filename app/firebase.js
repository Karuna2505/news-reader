import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAaNvI_mRNqiz8Pa5oTcolwIFkQY1Ef_YI",
  authDomain: "newsapp-cb66e.firebaseapp.com",
  projectId: "newsapp-cb66e",
  storageBucket: "newsapp-cb66e.appspot.com",
  messagingSenderId: "349512530461",
  appId: "1:349512530461:web:b1f953d4a4ce25b61da4f4"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db = getFirestore(app);



