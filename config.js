import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyASBNbivFE1WIdEr5-Ris7hNC2Odu6cZE0",
  authDomain: "test-86b07.firebaseapp.com",
  projectId: "test-86b07",
  storageBucket: "test-86b07.appspot.com",
  messagingSenderId: "319785590923",
  appId: "1:319785590923:web:a45b41754ad8bce6a5b48e",
  measurementId: "G-43BKFEV9JY"

};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

//const app = firebase.initializeApp(firebaseConfig);
//export const db = getFirestore(app);