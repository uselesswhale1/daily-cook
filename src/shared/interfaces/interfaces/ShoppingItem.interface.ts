import { ShoppingItemIngredient } from './ShoppingItemIngredient.interface';

export interface ShoppingItem {
  name: string,
  author: string,
  image: string,
  id: string,
  ingredients: ShoppingItemIngredient[],
  servings: number,
}
