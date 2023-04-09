import React, { useMemo } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import ListElement from './ListElement';
import { ShoppingItemIngredient } from '../../../interfaces';

export default function IngredientsList({
  items,
  onItemsChange,
}: {
  items: ShoppingItemIngredient[],
  onItemsChange: (newItems: ShoppingItemIngredient[]) => void
}) {
  const handleParentChange = (ev: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const newItems = items.map((item) => ({ ...item, isChecked: checked }));
    onItemsChange(newItems);
  };
  const handleListItemChange = (listItem: ShoppingItemIngredient) => {
    const newItems = items.map((item) => ((item.foodId === listItem.foodId) ? listItem : item));
    onItemsChange(newItems);
  };
  const parentChecked = useMemo(() => items
    .every((item: { isChecked: boolean }) => item.isChecked), [handleListItemChange]);

  const parent = (
    <ListItem
      key="list-parent"
      disablePadding
    >
      <ListItemButton>
        <FormControlLabel
          label="Ingredients:"
          control={(
            <Checkbox
              checked={parentChecked}
              onChange={handleParentChange}
            />
          )}
        />
      </ListItemButton>
    </ListItem>
  );
  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      {items.map((item) => (
        <ListElement
          item={item}
          onListItemChange={handleListItemChange}
          key={`list-${item.food}-${item.measure}-${item.weight}-0`}
        />
      ))}
    </Box>
  );
  return (
    <List sx={{ width: '100%' }}>
      {parent}
      {children}
    </List>
  );
}
