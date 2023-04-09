/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  Rating,
  Skeleton,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  AddShoppingCart,
  ShoppingCart,
} from '@mui/icons-material';
import useStyles from '../../useStyles';
import { RecipeItem, CommentElem, ShoppingStore } from '../interfaces';
import { deleteFavorite, saveFavorite } from '../../api/favorites.api';
import useSnackbarMessage from '../../hooks/useSnackbarMessage/useSnackbarMessage';
import { ErrorList } from '../constants/error-list';
import { getCommentsByRecipeId } from '../../api/comments.api';
import useShoppingListStore from '../../storage/useShoppingListStore';
import ShoppingItemFactory from '../factories/ShoppingItem.factory';

export default function RecipeCard({
  recipe,
  isSaved = false,
  onCartClick = () => { },
}: {
  recipe: RecipeItem,
  isSaved?: boolean,
  onCartClick?: (item: RecipeItem) => void,
}) {
  const styles = useStyles();
  const [rating, setRating] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { showErrorMessage } = useSnackbarMessage();
  const isShoppingItem = useShoppingListStore((state) => state.isShoppingItem);

  useEffect(() => {
    getCommentsByRecipeId(recipe.id)
      .then((res) => {
        const sumRating = [...res].reduce((acc, obj: CommentElem) => acc + obj.rating, 0);
        setRating(sumRating / res.length);
      });
    setIsAddedToCart(!!isShoppingItem(recipe.id));
  }, []);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    if (isFavorite) {
      deleteFavorite(recipe.id, recipe.uid as string)
        .catch(() => showErrorMessage(ErrorList.default));
    } else {
      saveFavorite({ ...recipe, isFavorite: true })
        .catch(() => showErrorMessage(ErrorList.default));
    }
  };
  const handleCartClick = () => {
    setIsAddedToCart(!isAddedToCart);
    onCartClick(recipe);
  };

  const linkProps = {
    to: `/recipes/${recipe.id}`,
    className: styles.link,
  };
  return (
    <Box sx={{
      p: 2,
      maxWidth: { sm: '50%', md: '50%' },
      flexShrink: 0.5,
      width: { xs: '100%', md: '66%', lg: '33%' },
    }}
    >
      <Card>
        {recipe ? (
          <Link
            {...linkProps}
          >
            <CardMedia
              component="img"
              alt={recipe.name}
              height="280"
              src={recipe.image}
            />
          </Link>
        ) : (
          <Skeleton variant="rectangular" width={350} height={280} />
        )}
        <CardContent>
          <Box className={styles.CardContent}>
            <Typography gutterBottom variant="h6">
              <Link
                {...linkProps}
              >
                {recipe.name}
              </Link>
            </Typography>
            <Box>
              <Button size="small" variant="text" onClick={handleFavoriteClick}>
                {isFavorite
                  ? <Favorite fontSize="large" />
                  : <FavoriteBorder fontSize="large" />}
              </Button>
            </Box>
          </Box>
          <Box className={styles.CardContent}>
            <Typography gutterBottom variant="body1">
              {recipe.author}
            </Typography>
            {isSaved
              ? (
                <Button size="small" onClick={handleCartClick}>
                  {isAddedToCart
                    ? <ShoppingCart fontSize="large" />
                    : <AddShoppingCart fontSize="large" />}
                </Button>
              )
              : null}
          </Box>
          <Box className={styles.CardContent}>
            <Rating
              max={5}
              value={rating}
              readOnly
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
