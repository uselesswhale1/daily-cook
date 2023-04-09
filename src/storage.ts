export const projectStorage = localStorage;
export const USER_KEY = 'user';
export const SAVEDLIST_KEY = 'user';

export const getItem = (key: string) => projectStorage.getItem(key);

export const setItem = (key: string, value: string) => {
  projectStorage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key: string) => {
  projectStorage.removeItem(key);
};

export const clearAll = () => {
  projectStorage.clear();
};

export const getLength = (): number => projectStorage.length;

export default {
  getItem,
  setItem,
  removeItem,
  clearAll,
  USER_KEY,
  SAVEDLIST_KEY,
};
