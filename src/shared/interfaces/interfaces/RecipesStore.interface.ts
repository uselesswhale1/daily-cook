import { RecipeItem } from './RecipeItem.interface';

export interface RecipesStore {
  recipes: RecipeItem[];
  setRecipes: (arrOfRecipes: RecipeItem[]) => void;
  getRecipeById: (id: string) => RecipeItem | undefined;
}
