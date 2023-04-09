import create from 'zustand';

import { AuthStore } from '../shared/interfaces';
import { getLocalStorageData } from '../shared/utils/localStorage.utils';

const storageKey = 'daily-cook-token';

export const useAuthStore = create<AuthStore>((set, get) => ({
  token: getLocalStorageData(storageKey, null),
  setToken: (newToken: string) => {
    localStorage.setItem(storageKey, newToken);
    set({
      token: newToken,
    });
  },
  resetToken: () => {
    localStorage.removeItem(storageKey);
    set({
      token: null,
    });
  },
  isAuthorization: () => {
    const { token } = get();
    return !!token;
  },
}));

export default useAuthStore;
