/* eslint-disable no-console */
import {
  RECIPE_SEARCH_URL,
  RecipeSearch,
} from '../constants/api';

export function fetchRecipes(q?: string) {
  return fetch(`${RECIPE_SEARCH_URL}?type=public&q=${q || ''}&app_id=${RecipeSearch.appId}&app_key=${RecipeSearch.appKey}&health=paleo`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((er) => {
      console.error(er);
      return [];
    });
}

export function fetchRecipeById(id: string) {
  return fetch(`${RECIPE_SEARCH_URL}/${id}?type=public&app_id=${RecipeSearch.appId}&app_key=${RecipeSearch.appKey}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((er) => {
      console.error(er);
      return [];
    });
}

export function fetchRecipesByUrl(url: string) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((er) => {
      console.error(er);
      return [];
    });
}

export default { fetchRecipes, fetchRecipeById, fetchRecipesByUrl };
