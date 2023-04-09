/* eslint-disable no-underscore-dangle */
import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import { useNavigate } from 'react-router';
import {
  Grid,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import {
  useRecipesStore,
} from '../storage/useRecipesStore';
import RecipeCard from '../shared/components/Card';
import debounce from '../shared/utils/debounce';
import sortingOptions from '../constants/sortingOptions';
import { fetchRecipes, fetchRecipesByUrl } from '../api/api';
import { transformRecipes } from '../services/transformRecipes.service';
import {
  RecipeItem, RecipesStore, RecipeSearchResponse, UserStore,
} from '../shared/interfaces';
import { sortRecipes } from '../services/sortRecipes.service';
import getLocalStorageData from '../shared/utils/localStorage.utils';
import { getFavorites } from '../api/favorites.api';
import { uniqueBy } from '../shared/utils/uniqBy';
import useUserStore from '../storage/useUserStore';

const sortByStorageKey = 'feed-sort-by';

export default function Feed() {
  const navigate = useNavigate();
  const [user] = useUserStore(
    (state: UserStore) => [state.user],
  );
  const [recipes, setRecipes] = useRecipesStore(
    (state: RecipesStore) => [state.recipes, state.setRecipes],
  );
  const [sortingOption, setSortingOption] = useState(
    getLocalStorageData(sortByStorageKey, null) || sortingOptions[1].value,
  );
  const [options, setOptions] = useState<RecipeItem[]>([]);
  const [inputLoading, setInputLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);
  const nextPageUrl = useRef('');
  const favoritesRecipes = useRef([]);
  const latestRecipes = useRef(recipes);
  latestRecipes.current = recipes;

  function callNextRecipes() {
    fetchRecipesByUrl(nextPageUrl.current)
      .then((res: RecipeSearchResponse) => {
        const result = transformRecipes(res.hits, user?.uid as string);
        const newRecipes = uniqueBy([
          ...latestRecipes.current,
          ...result,
          ...favoritesRecipes.current,
        ], (left: RecipeItem, right: RecipeItem) => left.id === right.id);
        setRecipes(newRecipes);
        nextPageUrl.current = res._links.next.href;
      })
      .catch((er) => console.error(er));
  }

  useEffect(() => {
    setLoading(true);
    setError(false);
    getLocalStorageData(sortByStorageKey, null);
    Promise.all([
      fetchRecipes(),
      getFavorites(user?.uid as string),
    ]).then(([data, favorites]) => {
      const result = transformRecipes(data.hits, user?.uid as string);
      const newRecipes = uniqueBy([
        ...favorites,
        ...result,
      ], (left: RecipeItem, right: RecipeItem) => left.id === right.id);
      setRecipes(sortRecipes(newRecipes, sortingOption));

      setLoading(false);
      nextPageUrl.current = data._links.next.href;
      favoritesRecipes.current = favorites || [];
    }).catch(() => {
      setLoading(false);
      setError(true);
      setRecipes([]);
    });
    const observer = new IntersectionObserver((entries: any) => {
      if (entries[0].isIntersecting) {
        callNextRecipes();
      }
    }, {
      threshold: 0,
    });
    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, []);

  const handleChangeValue = (e: any, newVal: RecipeItem | null) => {
    if (newVal !== null) {
      navigate(`/recipes/${newVal.id}`);
    }
  };

  const handleInputChange = (e: any, newVal: string) => {
    setInputLoading(true);
    setOptions([]);
    fetchRecipes(newVal)
      .then((res) => {
        setOptions(transformRecipes(res.hits, user?.uid as string));
        setInputLoading(false);
      })
      .catch((er) => {
        console.log(er);
        setOptions([]);
        setInputLoading(false);
      });
  };

  const handleSortingChange = (v: string) => {
    setSortingOption(v);
    window.localStorage.setItem(sortByStorageKey, JSON.stringify(v));
    setRecipes(sortRecipes(recipes, v));
  };

  const sortingComponent = (
    <FormControl variant="standard" sx={{ minWidth: 120 }}>
      <Select
        label="Not chosen"
        value={sortingOption}
        onChange={(e: any) => handleSortingChange(e.target.value)}
      >
        {sortingOptions.map(({ key, value }) => (
          <MenuItem key={key} value={value}>{value}</MenuItem>))}
      </Select>
    </FormControl>
  );
  const autocomplete = (
    <Autocomplete
      onChange={handleChangeValue}
      getOptionLabel={(option) => `${option.name} (${option.author})`}
      onInputChange={debounce(handleInputChange, 500)}
      options={options}
      loading={inputLoading}
      noOptionsText="Nothing found"
      sx={{ minWidth: { xs: 300 } }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search recipes"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {(!error && inputLoading) ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
  return (
    <Grid
      container
      component="main"
      display="grid"
      gridTemplateRows="70px 12fr"
    >
      <Grid item gridArea="1 / 1 / 2 / 13">
        {autocomplete}
      </Grid>
      <Grid item gridArea="2 / 1 / 3 / 12">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            align="left"
            color="text.primary"
          >
            Recipes:
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography
              mr={1}
              variant="h6"
              align="left"
              color="text.primary"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Sort by:
            </Typography>
            {sortingComponent}
          </Box>
        </Box>
      </Grid>
      <Grid item gridArea="3 / 1 / 12 / 12">
        {error && <Typography mt={2} color="error">Something bad happened, try later....</Typography>}
        <Box display="flex" justifyContent="flex-start" flexWrap="wrap">
          {
            recipes.length > 0 && !loading
              ? recipes.map((recipe: RecipeItem) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
              : <CircularProgress color="inherit" size={50} />
          }
        </Box>
        <div ref={loader} />
      </Grid>
    </Grid>
  );
}
