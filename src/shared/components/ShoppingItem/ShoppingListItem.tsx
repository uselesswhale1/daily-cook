import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Box,
  Button,
  Divider,
  TextField,
} from '@mui/material';
import {
  Delete, DeleteOutline, Add, Remove,
} from '@mui/icons-material';
import { ShoppingItem, ShoppingItemIngredient } from '../../interfaces';
import IngredientsList from './components/IngredientsList';

export default function ShoppingListItem({
  shoppingItem,
  onItemUpdate,
  onItemDelete,
}: {
  shoppingItem: ShoppingItem,
  onItemUpdate: (updatedItem: ShoppingItem) => void,
  onItemDelete: (itemToDelete: ShoppingItem) => void
}) {
  const [isDelete, setIsDelete] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleDelete = () => setIsDelete(!isDelete);
  const toggleIsHovered = () => setIsHovered(!isHovered);

  const handleDelete = () => onItemDelete(shoppingItem);
  const handleItemsChange = (newItems: ShoppingItemIngredient[]) => {
    const newShoppingItem = { ...shoppingItem, ingredients: newItems };
    onItemUpdate(newShoppingItem);
  };

  const handlePortionsInc = () => {
    const newItems = shoppingItem.ingredients.map((item: any) => ({
      ...item,
      quantity: item.quantity + item.servingPerPerson,
    }));
    const newShoppingItem = {
      ...shoppingItem,
      servings: shoppingItem.servings + 1,
      ingredients: newItems,
    };
    onItemUpdate(newShoppingItem);
  };
  const handlePortionsDec = () => {
    const newItems = shoppingItem.ingredients.map((item: any) => ({
      ...item,
      quantity: item.quantity - item.servingPerPerson,
    }));
    const newShoppingItem = {
      ...shoppingItem,
      servings: shoppingItem.servings - 1,
      ingredients: newItems,
    };
    onItemUpdate(newShoppingItem);
  };

  const minusPortionBtn = (
    <Button size="small" variant="outlined" disabled={shoppingItem.servings <= 1} onClick={handlePortionsDec}>
      <Remove />
    </Button>
  );
  const plusPortionBtn = (
    <Button size="small" variant="outlined" onClick={handlePortionsInc}>
      <Add />
    </Button>
  );

  const deleteButton = (
    <Button
      onClick={handleDelete}
      onMouseEnter={toggleDelete}
      onMouseLeave={toggleDelete}
    >
      {isDelete ? <Delete fontSize="large" color="error" />
        : <DeleteOutline fontSize="large" />}
    </Button>
  );
  return (
    <Grid container>
      <Grid container columnGap={1} rowGap={2}>
        <Grid item xs={12} sm={4} md={4} lg={3} mr={2} sx={{ width: '16rem', height: '12rem' }}>
          <img
            src={shoppingItem.image}
            alt={shoppingItem.name}
            style={{
              height: '100%',
              width: '100%',
              minWidth: '10rem',
              minHeight: '10rem',
              objectFit: 'cover',
              overflow: 'hidden',
              border: `2px solid ${isHovered ? 'black' : 'lightgray'}`,
            }}
            onMouseEnter={toggleIsHovered}
            onMouseLeave={toggleIsHovered}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={6} lg={7}>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <Typography variant="h5" align="left">
                {shoppingItem.name}
              </Typography>
            </Grid>
            <Grid item xs={10} sm={11} md={11} lg={11}>
              <Box sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6" align="left" mt={{ xs: 2, sm: 10 }}>
                  Servings: {shoppingItem.servings} {minusPortionBtn} {plusPortionBtn}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Box display="grid" sx={{ display: { xs: 'block', sm: 'none' }, justifyContent: 'flex-end' }}>
                {deleteButton}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1}>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {deleteButton}
          </Box>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
      >
        <IngredientsList
          items={shoppingItem.ingredients}
          onItemsChange={handleItemsChange}
        />
        <Divider sx={{ my: 4 }} />
      </Grid>
    </Grid>
  );
}
