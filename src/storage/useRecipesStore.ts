import create from 'zustand';
import { RecipeItem, RecipesStore } from '../shared/interfaces';

export const useRecipesStore = create<RecipesStore>((set, get) => ({
  recipes: <RecipeItem[]>[],
  setRecipes: (recipes: RecipeItem[]) => set({ recipes }),
  getRecipeById: (id: string) => {
    const { recipes } = get();
    return recipes.find((recipe: RecipeItem) => recipe.id === id);
  },
}));

export default useRecipesStore;
