import create from 'zustand';

import { DailyCookUser, UserStore } from '../shared/interfaces';
import { getLocalStorageData } from '../shared/utils/localStorage.utils';

const storageKey = 'daily-cook-user';

export const useUserStore = create<UserStore>((set, get) => ({
  user: getLocalStorageData(storageKey, null),
  getUserId(): string | null {
    const { user } = get();

    return user?.uid || null;
  },
  saveCurrentUser: (user: DailyCookUser) => {
    localStorage.setItem(storageKey, JSON.stringify(user));
    set({
      user,
    });
  },
  removeCurrentUser: () => {
    localStorage.removeItem(storageKey);
    set({
      user: null,
    });
  },
  updateCurrentUser: (user: DailyCookUser) => {
    const { saveCurrentUser } = get();

    saveCurrentUser(user);
  },
}));

export default useUserStore;
