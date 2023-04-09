import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  Grid,
  Box,
  Button,
  Typography,
  Divider,
  Rating,
  CircularProgress,
} from '@mui/material';
import {
  Favorite, FavoriteBorder, ArrowBack,
} from '@mui/icons-material';
import NotFound from '../pages/NotFound';
import { fetchRecipeById } from '../api/api';
import { transformRecipe } from '../services/transformRecipes.service';
import NutritionListItem from '../shared/components/NutritionListItem';
import CommentsList from '../shared/components/CommentList/CommentsList';

import { RecipeItem, CommentElem, UserStore } from '../shared/interfaces';
import { deleteFavorite, getFavoriteByReceiptId, saveFavorite } from '../api/favorites.api';
import { getCommentsByRecipeId } from '../api/comments.api';
import { ErrorList } from '../shared/constants/error-list';
import useSnackbarMessage from '../hooks/useSnackbarMessage/useSnackbarMessage';
import useUserStore from '../storage/useUserStore';

export default function Recipe() {
  const { pathname } = useLocation();
  const { showErrorMessage } = useSnackbarMessage();
  const idFromPath = pathname.slice(pathname.indexOf('recipes/') + 8, pathname.length);
  const [user] = useUserStore(
    (state: UserStore) => [state.user],
  );

  const [recipe, setRecipe] = useState<RecipeItem>();
  const [comments, setComments] = useState<CommentElem[]>([]);
  const [rating, setRating] = useState<number | null>(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchRecipeById(idFromPath)
      .then((res) => {
        transformRecipe(res.recipe, user?.uid as string)
          .then((newRecipe: RecipeItem) => {
            setRecipe(newRecipe);
            getCommentsByRecipeId(newRecipe.id)
              .then((comms) => {
                const sumRating = [...comms].reduce((acc, obj: CommentElem) => acc + obj.rating, 0);
                setRating(sumRating / res.length);
              });
            getFavoriteByReceiptId(newRecipe?.id, user?.uid as string)
              .finally(() => setLoading(false))
              .then((favorite) => setIsFavorite(!!favorite))
              .catch(() => setIsFavorite(false));
          });
      })
      .catch((er) => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    if (recipe && isFavorite) {
      deleteFavorite(recipe.id, recipe.uid as string)
        .catch(() => {
          showErrorMessage(ErrorList.default);
        });
    }
    if (recipe && !isFavorite) {
      saveFavorite({ ...recipe, isFavorite: true })
        .catch(() => {
          showErrorMessage(ErrorList.default);
        });
    }
  };

  if (loading && !error) {
    return (<CircularProgress color="inherit" size={50} />);
  }
  const handleArrowClick = () => navigate(-1);

  const handleCommentsChange = () => {
    getCommentsByRecipeId(idFromPath)
      .then((res) => {
        setComments(res);
        setRating([...res].reduce((acc, obj) => acc + obj.rating, 0) / res.length);
      });
  };

  return (
    <>
      {error
        && <NotFound />}
      {recipe
        && (
          <Grid
            container
            columns={{ xs: 12, sm: 8, md: 12 }}
            rowGap={4}
            px={4}
          >
            <Grid item xs={12} sm={12} md={7}>
              <Grid item xs={12} sm={8} md={12}>
                <Button
                  onClick={handleArrowClick}
                  sx={{
                    display: 'flex',
                    position: 'absolute',
                    left: { xs: 12, sm: 12, md: 30 },
                  }}
                >
                  <ArrowBack />
                </Button>
                <Typography variant="h4">
                  {recipe.name}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Typography variant="h6" mr={1}>
                  {recipe.author}
                </Typography>
                <Rating
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  readOnly
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Button variant="text" onClick={handleFavoriteClick}>
                  {isFavorite
                    ? <Favorite sx={{ fontSize: 60 }} />
                    : <FavoriteBorder sx={{ fontSize: 60 }} />}
                </Button>
              </Grid>
              <Grid item xs={12} sm={8} md={12} my={1}>
                <Box display="flex" flexDirection="row">
                  <Box display="flex" flexDirection="column" alignItems="center" mx={1}>
                    <Typography variant="h6">
                      {recipe.ingredients.items.length}
                    </Typography>
                    <Typography variant="body1">
                      Ingredients
                    </Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box display="flex" flexDirection="column" alignItems="center" mx={1}>
                    <Typography variant="h6">
                      {recipe.totalTime}
                    </Typography>
                    <Typography variant="body1">
                      Minutes
                    </Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box display="flex" flexDirection="column" alignItems="center" mx={1}>
                    <Typography variant="h6">
                      {recipe.calories}
                    </Typography>
                    <Typography variant="body1">
                      Calories
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8} md={12} my={1}>
                <Button variant="contained" href={recipe.url} sx={{ my: 2 }}>Read Directions</Button>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <Box sx={{ display: 'flex', border: '1px solid lightgray', maxWidth: 400 }}>
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    overflow: 'hidden',
                  }}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={5}
              sx={{
                display: 'grid',
                alignItems: 'center',
                alignContent: 'center',
              }}
            >
              <Box display="flex" flexDirection="column">
                <Typography variant="h5">Ingredients:</Typography>
                <ol>
                  {recipe.ingredients.lines
                    .map((ingredient: string) => (
                      <li key={ingredient}>
                        <Typography variant="body1">{ingredient}</Typography>
                      </li>
                    ))}
                </ol>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              <Typography align="left" mb={3}>
                {recipe.yield} servings
              </Typography>
              <Box display="flex" justifyContent="left">
                <Button variant="contained">Add to shopping list</Button>
              </Box>
            </Grid>
            <Grid
              item
              container
              columns={{ xs: 4, sm: 8, md: 12 }}
              xs={4}
              sm={8}
              md={12}
            >
              <Grid item xs={4} sm={8} md={12}>
                <Typography variant="h5" align="left">
                  Nutrition:
                </Typography>
              </Grid>
              <Grid item xs={4} sm={8} md={12}>
                <NutritionListItem nutritionAnalysis={recipe.nutritionAnalysis} />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} display="flex" alignItems="center">
              <Typography variant="h5">Reviews: ({comments.length})</Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                readOnly
                sx={{ ml: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <CommentsList
                id={idFromPath}
                onChange={handleCommentsChange}
                comments={comments}
              />
            </Grid>
          </Grid>
        )}
    </>
  );
}
