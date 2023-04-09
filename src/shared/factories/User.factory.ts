// eslint-disable-next-line import/no-extraneous-dependencies
import { User } from '@firebase/auth';

export class UserFactory {
  static create({
    uid, displayName, email, photoURL,
  }: User, username?: string) {
    return {
      uid: uid || null,
      name: displayName || username || '?',
      email: email || '',
      avatar: photoURL || '',
    };
  }
}

export default UserFactory;
