import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ShoppingItem, ShoppingStore } from '../shared/interfaces';
import ShoppingListItem from '../shared/components/ShoppingItem/ShoppingListItem';
import useShoppingListStore from '../storage/useShoppingListStore';
import getLocalStorageData from '../shared/utils/localStorage.utils';

const shoppingItemsStorageKey = 'shopping-list';

export default function ShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [
    shoppingItems,
    removeShoppingItem,
    updateShoppingItem,
  ] = useShoppingListStore(
    (state: ShoppingStore) => [
      state.shoppingItems,
      state.removeShoppingItem,
      state.updateShoppingItem,
    ],
  );

  const handleItemDelete = (itemToDelete: ShoppingItem) => removeShoppingItem(itemToDelete);
  const handleItemUpdate = (updatedItem: ShoppingItem) => {
    updateShoppingItem(updatedItem);
    setItems(getLocalStorageData(shoppingItemsStorageKey, [...items]));
  };

  useEffect(() => setItems(getLocalStorageData(shoppingItemsStorageKey, [])), []);
  useEffect(() => {
    setItems(getLocalStorageData(shoppingItemsStorageKey, []));
  }, [shoppingItems]);

  return (
    <>
      <Typography variant="h4" align="left">
        Shopping List
      </Typography>
      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        mt={{ xs: 6, sm: 8, md: 12 }}
      >
        {items.length > 0
          ? items.map((item) => (
            <ShoppingListItem
              shoppingItem={item}
              onItemUpdate={handleItemUpdate}
              onItemDelete={handleItemDelete}
              key={item.id}
            />
          ))
          : (
            <Typography color="primary" mt={2}>
              Shopping list is empty. Add items by clicking &quot;<AddShoppingCartIcon fontSize="large" sx={{ verticalAlign: 'middle' }} />&quot; icon
            </Typography>
          )}
      </Grid>
    </>
  );
}
