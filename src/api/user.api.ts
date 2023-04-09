import {
  query, collection, where, getDocs, addDoc, doc, updateDoc,
} from 'firebase/firestore';

import { database } from '../configs/firebase.config';
import { DailyCookUser } from '../shared/interfaces';
import { ErrorList } from '../shared/constants/error-list';

const userCollectionRef = collection(database, 'users');

export function getUser(uid: string): Promise<any> {
  const userQuery = query(userCollectionRef, where('uid', '==', uid));
  return getDocs(userQuery)
    .then((snapshot) => snapshot.docs.map((docs) => ({ ...docs.data() }))[0]);
}

export function updateUser(user: DailyCookUser): Promise<any> {
  const userQuery = query(userCollectionRef, where('uid', '==', user.uid as string));
  return getDocs(userQuery).then((snapshot) => {
    if (snapshot.docs[0].id) {
      return updateDoc(doc(database, 'users', snapshot.docs[0].id), { ...user });
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(ErrorList.default);
  });
}

export function saveUser(user: DailyCookUser): Promise<any> {
  return addDoc(userCollectionRef, user);
}
