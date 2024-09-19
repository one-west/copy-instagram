// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZyBqjmNQICdBpZlOV1Xx_dZXFmAg0iaM",
  authDomain: "daelimx-b751b.firebaseapp.com",
  projectId: "daelimx-b751b",
  storageBucket: "daelimx-b751b.appspot.com",
  messagingSenderId: "1027061089482",
  appId: "1:1027061089482:web:0824857711da23fedd2033",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 파이어베이스 인증 정보
export const auth = getAuth(app);
