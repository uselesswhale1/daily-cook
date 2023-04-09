import {
  query, collection, where, getDocs, addDoc, doc, getDoc, updateDoc, setDoc, deleteDoc,
} from 'firebase/firestore';
import { CommentElem } from '../shared/interfaces';
import { database } from '../configs/firebase.config';
import ErrorList from '../shared/constants/error-list';

const commentsCollectionRef = collection(database, 'comments');

export function getComments(): Promise<any> {
  const commentsQuery = query(commentsCollectionRef);
  return getDocs(commentsQuery)
    .then((snapshot) => (snapshot.docs.map((docs) => ({ ...docs.data() }))));
}

export function getCommentsByRecipeId(recipeId: string): Promise<any> {
  const commentsQuery = query(commentsCollectionRef, where('recipeId', '==', recipeId));
  return getDocs(commentsQuery)
    .then((snapshot) => (snapshot.docs.map((docs) => docs.data())));
}

export function addNewComment(newComment: CommentElem): Promise<any> {
  return addDoc(commentsCollectionRef, newComment);
}

export function updateComment(commentId: string, newValue: CommentElem): Promise<any> {
  const commentsQuery = query(commentsCollectionRef, where('id', '==', commentId));
  return getDocs(commentsQuery).then((snapshot) => {
    if (snapshot.docs[0].id) {
      return updateDoc(doc(database, 'comments', snapshot.docs[0].id), { ...newValue });
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('Somthing went wrong !');
  });
}

export function removeComment(commentId: string): Promise<any> {
  const commentsQuery = query(commentsCollectionRef, where('id', '==', commentId));
  return getDocs(commentsQuery)
    .then((snapshot) => {
      if (snapshot.docs[0].id) {
        return deleteDoc(doc(database, 'comments', snapshot.docs[0].id));
      }
      return Promise.reject(ErrorList.default);
    });
}

export default {
  getComments,
  getCommentsByRecipeId,
  updateComment,
  addNewComment,
  removeComment,
};
