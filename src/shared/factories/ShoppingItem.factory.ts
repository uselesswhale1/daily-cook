import {
  IngredientItem, RecipeItem, ShoppingItem, ShoppingItemIngredient,
} from '../interfaces';

function transformIngredients(items: IngredientItem[], servings: number): ShoppingItemIngredient[] {
  return items.map(({
    quantity,
    measure,
    food,
    weight,
    foodId,
  }: IngredientItem) => ({
    quantity,
    measure,
    food,
    weight,
    foodId,
    isChecked: false,
    servingPerPerson: quantity / servings,
  }));
}

export class ShoppingItemFactory {
  static create(recipe: RecipeItem): ShoppingItem {
    return {
      name: recipe.name,
      author: recipe.author,
      image: recipe.image,
      id: recipe.id,
      ingredients: transformIngredients(recipe.ingredients.items, recipe.yield),
      servings: recipe.yield,
    };
  }
}

export default ShoppingItemFactory;
