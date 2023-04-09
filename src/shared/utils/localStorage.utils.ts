export const getLocalStorageData = (key: string, defaultValue: unknown) => {
  try {
    return (JSON.parse(window.localStorage.getItem(key) || JSON.stringify(defaultValue)));
  } catch (err) {
    if (typeof window.localStorage.getItem(key) === 'string' && window.localStorage.getItem(key)) {
      return window.localStorage.getItem(key);
    }

    window.localStorage.setItem(key, JSON.stringify(defaultValue));
  }

  return defaultValue;
};

export default getLocalStorageData;
