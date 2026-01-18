// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALjuCdw2nFst1nDJztEO0Vzaz9w-K0ajc",
  authDomain: "crud-19605.firebaseapp.com",
  databaseURL: "https://crud-19605-default-rtdb.firebaseio.com",
  projectId: "crud-19605",
  storageBucket: "crud-19605.firebasestorage.app",
  messagingSenderId: "361380326944",
  appId: "1:361380326944:web:d10a008a5c6486b1451645"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig