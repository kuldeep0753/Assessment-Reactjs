import {initializeApp} from "firebase/app";
import {getFirestore}  from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAjPkB9kn1znwJuMruDN035cIAIHsqfaEE",
    authDomain: "my-blog-3fcb2.firebaseapp.com",
    projectId: "my-blog-3fcb2",
    storageBucket: "my-blog-3fcb2.appspot.com",
    messagingSenderId: "47117792651",
    appId: "1:47117792651:web:b2a57ea55704c7d5216b8e"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  //below for data storage
  export const storage =getStorage(app);
  //below code use to store image file
  export const db=getFirestore(app);

  // for authentication
  export const auth=getAuth(app);
