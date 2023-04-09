import React, { useState } from 'react';
import {
  Grid,
  Avatar,
  Box,
  Typography,
  TextField,
  Rating,
  Button,
  FormHelperText,
  FormControl,
} from '@mui/material';
import stringAvatar from '../../../utils/stringAvatar';
import { CommentElem } from '../../../interfaces';
import generateId from '../../../utils/generateId';

export default function NewComment({ id, user, onAddComment }: any) {
  const date = new Date().toDateString();
  const [ratingValue, setRating] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [validateError, setValidateError] = useState(false);

  const handleSubmit = () => {
    if (inputValue === '' || ratingValue === null) {
      setValidateError(true);
    } else {
      const newComment: CommentElem = {
        recipeId: id,
        author: user,
        id: generateId(),
        text: inputValue,
        rating: ratingValue,
        createdAt: date,
      };
      onAddComment(newComment);
      setRating(null);
      setInputValue('');
      setValidateError(false);
    }
  };
  const handleInputChange = (text: string) => {
    setValidateError(false);
    setInputValue(text);
  };

  return (
    <Grid
      item
      container
      columns={{ xs: 12, sm: 8, md: 12 }}
      mb={2}
    >
      <Grid
        item
        sm={2}
        mb={2}
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        <Avatar
          {...stringAvatar(user.name)}
          sx={{
            width: 50,
            height: 50,
            mx: 2,
            float: 'right',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row" alignItems="flex-end" justifyContent="space-between">
            <Box display="flex" flexDirection="row" alignItems="flex-end" mb={1}>
              <Typography variant="body1">
                {user.name}
              </Typography>
              <Rating
                name="simple-controlled"
                value={ratingValue}
                onChange={(e, newValue) => {
                  setRating(newValue);
                }}
              />
            </Box>
            <Typography sx={{ display: { xs: 'none', sm: 'flex' } }} variant="overline" color="gray">
              ({date})
            </Typography>
          </Box>
          <FormControl error variant="standard">
            <TextField
              placeholder="What do you think?"
              multiline
              fullWidth
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              maxRows={3}
            />
            {validateError
              && <FormHelperText>Some fields are empty, fill them first.</FormHelperText>}
          </FormControl>
        </Box>
        <Grid item xs={12} sm={6} md={12} pt={1} display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
