import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDiuDnXs479rsygkEbkjNB8tTM-QG7zuxw',
  authDomain: 'friendly-56b13.firebaseapp.com',
  projectId: 'friendly-56b13',
  storageBucket: 'friendly-56b13.appspot.com',
  messagingSenderId: '645722080622',
  appId: '1:645722080622:web:3bdcc776f44856bea9ad7f',
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database;
