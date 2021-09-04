import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBoSjySSXd7YswXCqv_IATrWRHZaFwRJ_k',
  authDomain: 'friendly-d825e.firebaseapp.com',
  projectId: 'friendly-d825e',
  storageBucket: 'friendly-d825e.appspot.com',
  messagingSenderId: '686891483119',
  appId: '1:686891483119:web:bcb6e32842b7a05aa7001a',
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database;
