import { NutritionAnalysis } from './NutritionAnalysis.interface';
import IngredientItem from './IngredientItem.interface';

export interface RecipeItem {
  name: string,
  author: string,
  id: string,
  uid?: string,
  rating: number,
  image: string,
  isFavorite: boolean,
  ingredients: {
    lines: string[],
    items: Array<IngredientItem>,
  },
  totalTime: string,
  calories: number,
  yield: number,
  nutritionAnalysis: NutritionAnalysis,
  url: string,
}
