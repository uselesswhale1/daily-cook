import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Divider, CircularProgress,
} from '@mui/material';

import Logo from '../shared/components/Logo';
import bgImgUrl from '../assets/images/image-3.jpg';
import MotivationFoodQuote from '../shared/components/MotivationFoodQuote';
import { signUp } from '../api/auth.api';
import { useForm } from '../hooks/useForm/useForm';
import useSnackbarMessage from '../hooks/useSnackbarMessage/useSnackbarMessage';

import useAuthStore from '../storage/useAuthStore';
import useUserStore from '../storage/useUserStore';
import { AuthErrorCode } from '../shared/enums/error-code.enum';
import { ErrorList } from '../shared/constants/error-list';

export default function SignUp() {
  const [setToken, isAuthorization, resetToken] = useAuthStore((state) => [
    state.setToken,
    state.isAuthorization,
    state.resetToken,
  ]);

  const [saveCurrentUser, removeCurrentUser] = useUserStore((state) => [
    state.saveCurrentUser,
    state.removeCurrentUser,
  ]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showErrorMessage } = useSnackbarMessage();

  const initialForm = {
    name: '',
    email: '',
    password: '',
  };

  const validations = {
    name: {
      required: {
        value: true,
        message: '',
      },
    },
    email: {
      required: {
        value: true,
        message: '',
      },
      pattern: {
        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
        message: 'Not a valid email address.',
      },
    },
    password: {
      required: {
        value: true,
        message: '',
      },
      custom: {
        isValid: ({ password }: Record<string, any>) => password.length >= 8,
        message: 'Required length is at least 8 characters',
      },
    },
  };

  const {
    formData,
    setFormData,
    formErrors,
    formState,
    isValidForm,
    handleChange,
  } = useForm({
    initialForm,
    validations,
  });

  useEffect(() => {
    if (isAuthorization()) {
      resetToken();
      removeCurrentUser();
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const { name, email, password } = formData;

    signUp(name, email, password)
      .finally(() => setLoading(false))
      .then(({ user, accessToken }) => {
        setToken(accessToken);
        saveCurrentUser(user);
        navigate('/');

        resetForm();
      })
      .catch(({ code }: { code: AuthErrorCode}) => {
        resetPassword();
        showErrorMessage(ErrorList[code] || ErrorList.default);
      });
  };

  function resetForm() {
    setFormData(initialForm);
  }

  function resetPassword() {
    setFormData({
      email: formData.email,
      password: '',
    });
  }

  const hasError = (field: string) => formState[field]?.isDirty && formErrors.hasOwnProperty(field);

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={false}
        md={6}
        sx={{
          backgroundImage: `url(${bgImgUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            mt: 1,
            mx: '10%',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'space-between' }}>
            <Logo hasSlogan />
            <Typography variant="h6" align="left">
              <MotivationFoodQuote />
            </Typography>
            <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
              Sign-Up
            </Typography>
            <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
              Create your new account
            </Typography>
            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
              Warm greeting and wishing you to get an unforgettable
              experience with our application. Welcome on board!.
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <TextField
                id="name"
                error={hasError('name')}
                fullWidth
                name="name"
                disabled={loading}
                value={formData.name}
                onChange={handleChange('name')}
                label="Enter Name"
                placeholder="Enter Email"
                helperText={formErrors && formErrors.name}
                sx={{ mb: 3 }}
              />
              <TextField
                id="email"
                name="email"
                error={hasError('email')}
                fullWidth
                autoComplete="email"
                disabled={loading}
                value={formData.email}
                onChange={handleChange('email')}
                label="Enter Email"
                placeholder="Enter Email"
                helperText={formErrors && formErrors.email}
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                error={hasError('password')}
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                disabled={loading}
                value={formData.password}
                onChange={handleChange('password')}
                label="Enter password"
                placeholder="Enter password"
                helperText={formErrors && formErrors.password}
                sx={{ mb: 3 }}
              />
              <Box
                sx={{
                  margin: '8px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!isValidForm || loading}
                >
                  Create Account

                  {loading ? (
                    <CircularProgress size={20} sx={{ marginX: '10px' }} />
                  ) : null}
                </Button>

              </Box>
            </Box>
            <Divider>or</Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Link to="/signin" style={{ color: 'inherit' }}>
                Alerady have an account? Sign In
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
