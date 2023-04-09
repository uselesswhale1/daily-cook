import create from 'zustand';
import { RecipeItem, ShoppingItem, ShoppingStore } from '../shared/interfaces';
import getLocalStorageData from '../shared/utils/localStorage.utils';

const shoppingItemsStorageKey = 'shopping-list';

export const useShoppingListStore = create<ShoppingStore>((set, get) => ({
  shoppingItems: getLocalStorageData(shoppingItemsStorageKey, []),
  setShoppingItems: (items: ShoppingItem[]) => {
    const { updateShoppingList } = get();
    updateShoppingList(items);
  },
  isShoppingItem: (id: string): ShoppingItem | undefined => {
    const { shoppingItems } = get();
    return shoppingItems.find((item) => item.id === id);
  },
  addShoppingItem: (item: ShoppingItem) => {
    const { shoppingItems, updateShoppingList } = get();
    updateShoppingList([...shoppingItems, { ...item }]);
  },
  updateShoppingItem: (itemToUpdate: ShoppingItem) => {
    const { shoppingItems, updateShoppingList } = get();
    const newItems = shoppingItems.map((item) => {
      if (item.id === itemToUpdate.id) {
        return itemToUpdate;
      }
      return item;
    });
    updateShoppingList(newItems);
  },
  removeShoppingItem: (item: ShoppingItem) => {
    const { shoppingItems, updateShoppingList } = get();
    const newItems = shoppingItems.filter((i: ShoppingItem) => i.id !== item.id);
    updateShoppingList(newItems);
  },
  removeShoppingItems: () => {
    const { updateShoppingList } = get();
    updateShoppingList([]);
    localStorage.removeItem(shoppingItemsStorageKey);
  },
  updateShoppingList: (items: ShoppingItem[]) => {
    set({ shoppingItems: items });
    localStorage.setItem(shoppingItemsStorageKey, JSON.stringify(items));
  },
}));

export default useShoppingListStore;
