import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzykArDFdK_cWiCYIv12ULGmDhG3TGjN4",
  authDomain: "e-commersce-site.firebaseapp.com",
  projectId: "e-commersce-site",
  storageBucket: "e-commersce-site.firebasestorage.app",
  messagingSenderId: "27366728172",
  appId: "1:27366728172:web:460871f2b66e864f8ce0c9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
