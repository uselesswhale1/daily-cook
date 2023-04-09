import React, { useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { Delete, DeleteOutline } from '@mui/icons-material';
import UserAvatar from '../../UserAvatar';
import { CommentElem } from '../../../interfaces';

export default function CommentItem(props: any) {
  const { canBeEdited, onUpdateComment, onRemoveComment } = props;
  const [comment] = useState<CommentElem>(props.comment);
  const [rating, setRating] = useState<number>(comment.rating);
  const [inputValue, setInputValue] = useState(comment.text);

  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [validateError, setValidateError] = useState(false);

  const handleSubmit = () => {
    if (inputValue === '' || rating === null) {
      setValidateError(true);
    } else {
      const updComment = {
        ...comment,
        text: inputValue,
        rating,
      };
      onUpdateComment(comment.id, updComment);
      setValidateError(false);
      setIsEditing(false);
    }
  };
  const handleInputChange = (newInputValue: string) => {
    setValidateError(false);
    setInputValue(newInputValue);
  };
  const toggleIsHovered = () => setIsHovered(!isHovered);
  const handleDoubleClick = () => setIsEditing(!isEditing);

  const handleDelete = () => onRemoveComment(comment.id);

  return (
    <Grid
      item
      container
      columns={{ xs: 12, sm: 8, md: 12 }}
      mb={2}
    >
      <Grid item sm={2} mb={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
        <UserAvatar
          name={comment.author.name}
          sx={{
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
                {comment.author.name}
              </Typography>
              <Rating
                name="simple-controlled"
                max={5}
                value={rating}
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setRating(newValue);
                  }
                }}
                readOnly={!isEditing}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              />
              <Typography sx={{ display: { xs: 'block', sm: 'none' }, ml: 2 }}>
                {rating}
              </Typography>
              <Rating
                max={1}
                value={rating}
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setRating(newValue);
                  }
                }}
                readOnly={!isEditing}
                sx={{ display: { xs: 'flex', sm: 'none' } }}
              />
            </Box>
            <Typography variant="overline" color="gray" fontSize={{ xs: '0.6rem' }}>
              ({comment.createdAt})
            </Typography>
          </Box>

          {isEditing && canBeEdited
            ? (
              <>
                <FormControl error variant="standard">
                  <TextField
                    type="text"
                    value={inputValue}
                    placeholder="What do you think?"
                    onChange={(e) => handleInputChange(e.target.value)}
                    multiline
                    fullWidth
                    maxRows={3}
                  />
                  {validateError
                    && <FormHelperText>Some fields are empty, fill them first.</FormHelperText>}
                </FormControl>
                <Grid item xs={12} sm={6} md={12} pt={1} display="flex" justifyContent="flex-end">
                  <Button
                    onClick={handleDelete}
                    onMouseEnter={toggleIsHovered}
                    onMouseLeave={toggleIsHovered}
                  >
                    {isHovered ? <DeleteOutline /> : <Delete color="error" />}
                  </Button>
                  <Button variant="contained" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Grid>
              </>
            )
            : (
              <span onDoubleClick={handleDoubleClick}>
                <Box
                  onMouseEnter={toggleIsHovered}
                  onMouseLeave={toggleIsHovered}
                  sx={{
                    width: '100%', minHeight: '60px', border: `1px solid ${isHovered ? 'black' : 'lightgray'}`, p: 1, borderRadius: '4px',
                  }}
                >
                  <Typography>
                    {comment.text}
                  </Typography>
                </Box>
              </span>
            )}
        </Box>
      </Grid>
    </Grid>
  );
}
