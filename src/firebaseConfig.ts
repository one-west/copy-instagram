// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_9HBVfaS-U09xo0rvK7sg28WwBVEmlBg",
  authDomain: "copy-instagram-82b30.firebaseapp.com",
  projectId: "copy-instagram-82b30",
  storageBucket: "copy-instagram-82b30.firebasestorage.app",
  messagingSenderId: "659973382619",
  appId: "1:659973382619:web:8ca54285db217b3ddc47fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 파이어베이스 인증 정보
export const auth = getAuth(app);

// 파이어베이스 DB 정보
export const firestore = getFirestore(app);

// 파이어베이스 스토리지 정보
export const storage = getStorage(app);