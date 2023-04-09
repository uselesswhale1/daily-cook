import { RecipeItem, NutritionAnalysisElem } from '../shared/interfaces';

const modifyNutritionElems = (nutrition: NutritionAnalysisElem) => (
  { ...nutrition, quantity: Math.round(nutrition.quantity) }
);
const getRecipeId = (uri: string) => uri.slice(uri.indexOf('#') + 1, uri.length);

export function transformRecipes(recipes: any, uid: string): RecipeItem[] {
  return recipes.map(({ recipe }: any) => {
    const result: RecipeItem = {
      name: recipe.label,
      author: recipe.source,
      id: getRecipeId(recipe.uri),
      uid,
      rating: 0,
      image: recipe.image,
      isFavorite: false,
      ingredients: {
        lines: recipe.ingredientLines,
        items: recipe.ingredients,
      },
      totalTime: recipe.totalTime,
      calories: Math.round(recipe.calories),
      yield: recipe.yield,
      nutritionAnalysis: {
        calories: {
          label: 'calories',
          quantity: Math.round(recipe.calories),
          unit: '',
        },
        FAT: modifyNutritionElems(recipe.totalDaily.FAT),
        NA: modifyNutritionElems(recipe.totalDaily.NA),
        PROCNT: modifyNutritionElems(recipe.totalDaily.PROCNT),
        CHOCDF: modifyNutritionElems(recipe.totalDaily.CHOCDF),
        FIBTG: modifyNutritionElems(recipe.totalDaily.FIBTG),
      },
      url: recipe.url,
    };
    return result;
  });
}

export async function transformRecipe(apiRecipe: any, uid?: string): Promise<any> {
  const result: any = {
    name: apiRecipe.label,
    author: apiRecipe.source,
    id: getRecipeId(apiRecipe.uri),
    uid,
    rating: 0,
    image: apiRecipe.image,
    isFavorite: false,
    ingredients: {
      lines: apiRecipe.ingredientLines,
      items: apiRecipe.ingredients,
    },
    totalTime: apiRecipe.totalTime,
    calories: Math.round(apiRecipe.calories),
    yield: apiRecipe.yield,
    nutritionAnalysis: {
      calories: {
        label: 'calories',
        quantity: Math.round(apiRecipe.calories),
        unit: '',
      },
      FAT: modifyNutritionElems(apiRecipe.totalDaily.FAT),
      NA: modifyNutritionElems(apiRecipe.totalDaily.NA),
      PROCNT: modifyNutritionElems(apiRecipe.totalDaily.PROCNT),
      CHOCDF: modifyNutritionElems(apiRecipe.totalDaily.CHOCDF),
      FIBTG: modifyNutritionElems(apiRecipe.totalDaily.FIBTG),
    },
    url: apiRecipe.url,
  };
  return result;
}

export default {
  transformRecipes,
  transformRecipe,
};
