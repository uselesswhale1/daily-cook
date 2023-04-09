import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBdfKOHDORKRbFQY3I4PujzDJDkemJdzZY',
  authDomain: 'sigma-daily-cook.firebaseapp.com',
  projectId: 'sigma-daily-cook',
  storageBucket: 'sigma-daily-cook.appspot.com',
  messagingSenderId: '405003471063',
  appId: '1:405003471063:web:fb6ac0e7986bc2d48c0892',
};

const app = initializeApp(config);

export const auth = getAuth(app);
export const database = getFirestore(app);
export default app;
