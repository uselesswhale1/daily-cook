import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBdfKOHDORKRbFQY3I4PujzDJDkemJdzZY',
  authDomain: 'sigma-daily-cook.firebaseapp.com',
  projectId: 'sigma-daily-cook',
  storageBucket: 'sigma-daily-cook.appspot.com',
  messagingSenderId: '405003471063',
  appId: '1:405003471063:web:6a4e8656fa914e868c0892',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getFirestore(app);
export default app;
