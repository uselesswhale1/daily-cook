import React, { useState, useMemo } from 'react';
import {
  FormControlLabel,
  Checkbox,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { ShoppingItemIngredient } from '../../../interfaces';
import toRounded from '../../../utils/toRounded';

export default function ListElement({
  item,
  onListItemChange,
}: {
  item: ShoppingItemIngredient,
  onListItemChange: (listItem: ShoppingItemIngredient) => void,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const toggleIsHovered = () => setIsHovered(!isHovered);
  const measurement = (item.measure === '<unit>' || !item.measure) ? 'unit' : item.measure;
  const getRoundedValue = useMemo(() => toRounded(item.quantity), [item.quantity]);
  return (
    <ListItem
      key={`list-${item.food}-${item.measure}-${item.weight}-1`}
      onMouseEnter={toggleIsHovered}
      onMouseLeave={toggleIsHovered}
      sx={{
        my: 1,
        p: 0,
        border: `1px solid ${isHovered ? 'black' : 'lightgray'}`,
        background: item.isChecked ? 'lightgray' : '',
        textDecoration: item.isChecked ? 'line-through' : '',
      }}
      secondaryAction={(
        <Typography mr={{ xs: 2, sm: 10 }}>
          {item.quantity === 0 ? '<1' : getRoundedValue} {measurement}
        </Typography>
      )}
    >
      <ListItemButton
        onChange={() => onListItemChange({ ...item, isChecked: !item.isChecked })}
      >
        <FormControlLabel
          label={item.food}
          control={(
            <Checkbox
              checked={item.isChecked}
            />
          )}
        />
      </ListItemButton>
    </ListItem>
  );
}
