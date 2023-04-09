import { DailyCookUser } from './User.interface';

export interface UserStore {
  user: DailyCookUser | null;
  getUserId: () => string | null;
  saveCurrentUser: (user: DailyCookUser) => void;
  removeCurrentUser: () => void;
  updateCurrentUser: (user: DailyCookUser) => void;
}
