import { ShoppingItem } from '..';

export interface ShoppingStore {
  shoppingItems: ShoppingItem[];
  setShoppingItems: (items: ShoppingItem[]) => void;
  isShoppingItem: (id: string) => ShoppingItem | undefined;
  updateShoppingItem: (item: ShoppingItem) => void;
  removeShoppingItem: (itemToRemove: ShoppingItem) => void;
  addShoppingItem: (item: ShoppingItem) => void;
  removeShoppingItems: (item: ShoppingItem) => void;
  updateShoppingList: (items: ShoppingItem[]) => void;
}
