import React, { ChangeEventHandler, useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Paper,
  Box,
  Button, CircularProgress,
} from '@mui/material';
import useUserStore from '../storage/useUserStore';
import { UserStore, DailyCookUser } from '../shared/interfaces';
import UserAvatar from '../shared/components/UserAvatar';
import { Size } from '../shared/enums/size.enum';
import { updateUser } from '../api/user.api';
import useSnackbarMessage from '../hooks/useSnackbarMessage/useSnackbarMessage';

export default function Profile() {
  const [user, updateCurrentUser] = useUserStore((state: UserStore) => [
    state.user,
    state.updateCurrentUser,
  ]);
  const [username, setUsername] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);
  const { showErrorMessage, showSuccessMessage } = useSnackbarMessage();

  const handleSave = () => {
    setLoading(true);

    const updatedUser = { ...user };
    updatedUser.name = username;
    updateUser(updatedUser as DailyCookUser)
      .finally(() => setLoading(false))
      .then(() => {
        updateCurrentUser(updatedUser as DailyCookUser);
        showSuccessMessage('The user was successfully changes');
      })
      .catch((error) => {
        showErrorMessage(error.message);
      });
  };

  const handleChangeName = ({ target }: any) => {
    setUsername(target?.value);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={loading}
        >
          Save

          {loading ? (
            <CircularProgress size={20} sx={{ marginX: '10px' }} />
          ) : null}
        </Button>
      </Box>

      <Paper elevation={4} square>
        <Grid
          container
          columns={{ xs: 4, sm: 8, md: 12 }}
          mt={4}
        >
          <Grid item xs={4} sm={8} md={12}>
            <Typography variant="h4" align="center" sx={{ my: 3 }}>
              Account settings
            </Typography>
          </Grid>
          <Grid item xs={4} sm={8} md={4}>
            <Box
              display="flex"
              boxSizing="border-box"
              flexDirection="column"
              alignItems="center"
            >
              <UserAvatar
                name={user?.name}
                size={Size.EXTRA_LARGE}
                src={user?.avatar}
              />
              <Typography variant="h6" my={1}>
                {user?.name}
              </Typography>
              <Typography variant="body1" mb={2} sx={{ fontWeight: 'bold' }}>
                {user?.email}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            sm={12}
            md={8}
            container
            columns={{ xs: 4, sm: 8, md: 12 }}
            display="flex"
            alignContent="center"
            justifyContent="center"
          >
            <Grid item xs={3} sm={4} md={10}>
              <TextField
                fullWidth
                value={username}
                onChange={handleChangeName}
                disabled={loading}
                placeholder="Enter new username"
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
