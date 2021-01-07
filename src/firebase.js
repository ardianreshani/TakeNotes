import  firebase from 'firebase/app';
import 'firebase/firestore';

  const firebaseConfig = {
  apiKey: "AIzaSyAlIW-0xpp_zifHF9tovEX1NtFmrcCOeVg",
  authDomain: "takenotes-70768.firebaseapp.com",
  projectId: "takenotes-70768",
  storageBucket: "takenotes-70768.appspot.com",
  messagingSenderId: "474823657466",
  appId: "1:474823657466:web:2e138ae3cb7a6824f64643",
  measurementId: "G-8NDPCNZX7H"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export default firebase