import React, { useState, useEffect } from 'react';
import {
  Box, CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { onSnapshot } from '@firebase/firestore';
import RecipeCard from '../shared/components/Card';
import { RecipeItem } from '../shared/interfaces';
import { getFavoritesQueryByUID } from '../api/favorites.api';
import useUserStore from '../storage/useUserStore';
import useShoppingListStore from '../storage/useShoppingListStore';
import ShoppingItemFactory from '../shared/factories/ShoppingItem.factory';

export default function SavedRecipes() {
  const user = useUserStore((state) => state.user);
  const [favorites, setFavorites] = useState<RecipeItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [isShoppingItem, removeShoppingItem, addShoppingItem] = useShoppingListStore(
    (state) => [
      state.isShoppingItem, state.removeShoppingItem, state.addShoppingItem,
    ],
  );

  useEffect(() => {
    setLoading(true);

    const unsub = onSnapshot(getFavoritesQueryByUID(user?.uid as string), (snapshot) => {
      const favs = snapshot.docs.map((docs) => ({ ...docs.data() }));
      setFavorites(favs as RecipeItem[]);
      setLoading(false);
    });

    return () => {
      unsub();
    };
  }, []);

  const handleCartClick = (recipe: RecipeItem) => {
    const shoppingItem = isShoppingItem(recipe.id);
    if (shoppingItem) {
      removeShoppingItem(shoppingItem);
    } else {
      const newItem = ShoppingItemFactory.create(recipe);
      addShoppingItem(newItem);
    }
  };

  return (
    <Grid
      container
      component="main"
      display="grid"
      gridTemplateRows="70px 12fr"
      p={2}
    >
      <Grid item gridArea="1 / 1 / 2 / 13">
        <TextField fullWidth placeholder="Search receipt" type="search" sx={{ minWidth: '100%' }} />
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
            Saved recipes:
          </Typography>
        </Box>
      </Grid>
      <Grid item gridArea="3 / 1 / 12 / 12">
        <Box display="flex" flexWrap="wrap">
          {loading && <CircularProgress color="inherit" size={50} />}
          {!loading && favorites.length
            ? (
              favorites.map((recipe: RecipeItem) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isSaved
                  onCartClick={handleCartClick}
                />
              ))
            )
            : <Typography color="primary" mt={2}>No favorite recipes were added yet</Typography>}
        </Box>
      </Grid>
    </Grid>
  );
}
