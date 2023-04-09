/* eslint-disable next-line */
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
} from '@mui/material';
import CommentItem from './components/CommentItem';
import NewComment from './components/NewComment';
import { CommentElem, DailyCookUser, UserStore } from '../../interfaces';
import {
  updateComment,
  addNewComment,
  removeComment,
} from '../../../api/comments.api';
import useUserStore from '../../../storage/useUserStore';

export default function CommentsList(props: any) {
  const { id, onChange, comments } = props;
  const user: DailyCookUser | null = useUserStore((state: UserStore) => state.user);

  useEffect(() => onChange(), []);

  const handleAdding = (newComment: CommentElem) => {
    addNewComment(newComment)
      .then(() => {
        // alert('Comment is added successfully!');
      }).catch((err) => {
        // console.error(err.message);
      });
    onChange();
  };

  const handleUpdating = (commentId: string, newComment: CommentElem) => {
    updateComment(commentId, newComment)
    // .then(() => alert('Comment updated!'))
    // .catch((err) => console.error(err.message));
    onChange();
  };

  const handleRemoving = (commentId: string) => {
    removeComment(commentId)
    // .then(() => alert('Comment was removed!'))
    // .catch((err) => console.error(err.message));
    onChange();
  };

  return (
    <Grid
      container
      columns={{ xs: 4, sm: 8, md: 12 }}
      spacing={{ xs: 2, sm: 1 }}
    >
      <NewComment onAddComment={handleAdding} id={id} user={user} />
      {!comments.length
        ? <Typography color="primary" my={3}>No comments were added yet, be the first!</Typography>
        : comments.map((comment: CommentElem) => (
          <CommentItem
            key={`${comment.createdAt}-${comment.id}`}
            comment={comment}
            recipeId={id}
            canBeEdited
            onUpdateComment={handleUpdating}
            onRemoveComment={handleRemoving}
          />
        ))}
    </Grid>
  );
}
