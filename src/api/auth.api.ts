import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  UserCredential,
  User,
} from 'firebase/auth';
import { auth } from '../configs/firebase.config';
import { UserFactory } from '../shared/factories/User.factory';
import { getUser, saveUser } from './user.api';

const provider = new GoogleAuthProvider();

function getUserAndFetch(firebaseUser: User) {
  return getUser(firebaseUser.uid).then((currentUser) => {
    let newUser = UserFactory.create(firebaseUser);

    if (currentUser) {
      newUser = currentUser;
    } else {
      saveUser(newUser);
    }

    return {
      user: newUser,
      accessToken: (firebaseUser as User & { accessToken: string }).accessToken,
    };
  });
}

export function signIn(email: string, password: string): Promise<any> {
  return signInWithEmailAndPassword(auth, email, password)
    .then(({ user }: UserCredential) => getUserAndFetch(user));
}

export function signInViaGoogle(): Promise<any> {
  return signInWithPopup(auth, provider)
    .then(({ user }: UserCredential) => getUserAndFetch(user));
}

export function signUp(name: string, email: string, password: string): Promise<any> {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }: UserCredential) => {
      const newUser = UserFactory.create(user, name);

      saveUser(newUser);

      return { user: newUser, accessToken: (user as User & { accessToken: string }).accessToken };
    });
}

export function signOut(): Promise<any> {
  return auth.signOut();
}

export function forgotPassword(email: string): Promise<any> {
  return sendPasswordResetEmail(auth, email, {
    url: 'https://sigma-daily-cook.web.app/signin',
  });
}
