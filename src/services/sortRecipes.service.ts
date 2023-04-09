import { RecipeItem } from '../shared/interfaces';

type SortingNums = 'rating' | 'calories';
export function sortRecipes(recipes: RecipeItem[], sortBy: string): RecipeItem[] {
  switch (sortBy) {
    case 'Name (asc)':
      sortByName(recipes);
      break;
    case 'Name (desc)':
      sortByName(recipes).reverse();
      break;
    case 'Most rated':
      sortByNums(recipes, 'rating').reverse();
      break;
    case 'Most nutritious':
      sortByNums(recipes, 'calories').reverse();
      break;
    case 'Less nutritious':
      sortByNums(recipes, 'calories');
      break;
    default:
      break;
  }
  return recipes;
}
function sortByNums(recipes: RecipeItem[], sortBy: SortingNums) {
  return recipes.sort((a, b) => a[sortBy] - b[sortBy]);
}

function sortByName(recipes: RecipeItem[]): RecipeItem[] {
  return recipes.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
}

export default sortRecipes;
