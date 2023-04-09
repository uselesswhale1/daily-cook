import {
  query, collection, where, getDocs, addDoc, doc, deleteDoc,
} from 'firebase/firestore';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Query } from '@firebase/firestore';
import { database } from '../configs/firebase.config';
import { RecipeItem } from '../shared/interfaces/interfaces/RecipeItem.interface';
import { ErrorList } from '../shared/constants/error-list';

const favoritesCollectionRef = collection(database, 'favorites');

export function getFavoritesQueryByUID(uid: string): Query<any> {
  return query(favoritesCollectionRef, where('uid', '==', uid));
}

export function getFavorites(uid: string): Promise<any> {
  const favoritesQuery = query(favoritesCollectionRef, where('uid', '==', uid));
  return getDocs(favoritesQuery)
    .then((snapshot) => snapshot.docs.map((docs) => ({ ...docs.data() })));
}

export function getFavoriteByReceiptId(recipeId: string, uid: string): Promise<any> {
  const favoritesQuery = query(favoritesCollectionRef, where('id', '==', recipeId), where('uid', '==', uid));
  return getDocs(favoritesQuery)
    .then((snapshot) => snapshot.docs.map((docs) => ({ ...docs.data() }))[0]);
}

export function saveFavorite(recipe: RecipeItem): Promise<any> {
  return addDoc(favoritesCollectionRef, recipe);
}

export function deleteFavorite(recipeId: string, uid: string): Promise<any> {
  const favoritesQuery = query(favoritesCollectionRef, where('id', '==', recipeId), where('uid', '==', uid));
  return getDocs(favoritesQuery).then((snapshot) => {
    if (snapshot.docs[0].id) {
      return deleteDoc(doc(database, 'favorites', snapshot.docs[0].id));
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(ErrorList.default);
  });
}
