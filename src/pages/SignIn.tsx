import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CssBaseline,
  Button,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Divider, CircularProgress,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Logo from '../shared/components/Logo';
import bgImgUrl from '../assets/images/image-1.jpg';
import MotivationFoodQuote from '../shared/components/MotivationFoodQuote';
import useSnackbarMessage from '../hooks/useSnackbarMessage/useSnackbarMessage';
import { signIn, signInViaGoogle } from '../api/auth.api';
import { useForm } from '../hooks/useForm/useForm';

import useAuthStore from '../storage/useAuthStore';
import useUserStore from '../storage/useUserStore';
import { AuthStore, UserStore } from '../shared/interfaces';
import { ErrorList } from '../shared/constants/error-list';
import { AuthErrorCode } from '../shared/enums/error-code.enum';

export default function SignIn() {
  const [setToken, isAuthorization, resetToken] = useAuthStore((state: AuthStore) => [
    state.setToken,
    state.isAuthorization,
    state.resetToken,
  ]);

  const [saveCurrentUser, removeCurrentUser] = useUserStore((state: UserStore) => [
    state.saveCurrentUser,
    state.removeCurrentUser,
  ]);

  const [signInLoading, setSignInLoading] = useState(false);
  const [oAuthLoading, setOAuthLoading] = useState(false);
  const navigate = useNavigate();
  const { showErrorMessage } = useSnackbarMessage();

  const initialForm = {
    email: '',
    password: '',
  };

  const validations = {
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

  const handleGoogleSignIn = () => {
    setSignInLoading(false);
    setOAuthLoading(true);

    signInViaGoogle()
      .finally(() => setOAuthLoading(false))
      .then(({ user, accessToken }) => {
        setToken(accessToken);
        saveCurrentUser(user);
        navigate('/feed');
        resetForm();
      })
      .catch(({ code }: { code: AuthErrorCode }) => {
        resetPassword();
        showErrorMessage(ErrorList[code] || ErrorList.default);
      });
  };
  const handleEmailPasswordSignIn = () => {
    const { email, password } = formData;
    setSignInLoading(true);
    setOAuthLoading(false);

    signIn(email, password)
      .finally(() => setSignInLoading(false))
      .then(({ user, accessToken }) => {
        setToken(accessToken);
        saveCurrentUser(user);
        navigate('/feed');

        resetForm();
      })
      .catch((_) => {
        resetPassword();
        showErrorMessage('Email address or password is incorrect.');
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
            mt: 4,
            mx: '10%',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'space-between',
          }}
        >
          <Logo hasSlogan />
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            mt: 1,
          }}
          >
            <Typography variant="h6" align="left">
              <MotivationFoodQuote />
            </Typography>
            <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
              Sign-In
            </Typography>
            <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
              Login to your account
            </Typography>
            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
              Thank you for get back to Daily Cook application,
              let&sbquo;s access your the best helper and adviser
            </Typography>
            <Box component="form" name="form" noValidate>
              <TextField
                id="email"
                error={hasError('email')}
                fullWidth
                autoFocus
                disabled={signInLoading || oAuthLoading}
                value={formData.email}
                onChange={handleChange('email')}
                autoComplete="email"
                label="Enter Email"
                placeholder="Enter Email"
                helperText={formErrors && formErrors.email}
                sx={{ mb: 3 }}
              />
              <TextField
                id="password"
                error={hasError('password')}
                fullWidth
                type="password"
                autoComplete="current-password"
                label="Enter password"
                disabled={signInLoading || oAuthLoading}
                value={formData.password}
                onChange={handleChange('password')}
                placeholder="Enter password"
                helperText={formErrors && formErrors.password}
                sx={{ mb: 3 }}
              />

              <Grid
                container
                columns={{
                  xs: 12, sm: 12, md: 12, lg: 12,
                }}
                spacing={2}
                justifyContent="space-between"
              >
                <Grid item xs={12} sm={6} md={12} lg={6}>
                  <Button
                    onClick={handleEmailPasswordSignIn}
                    fullWidth
                    variant="contained"
                    disabled={!isValidForm || signInLoading || oAuthLoading}
                  >
                    Sign In

                    {signInLoading ? (
                      <CircularProgress size={20} sx={{ marginX: '10px' }} />
                    ) : null}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={12} lg={6}>
                  <Button
                    onClick={handleGoogleSignIn}
                    fullWidth
                    variant="contained"
                    disabled={signInLoading || oAuthLoading}
                  >
                    Sign In using <GoogleIcon sx={{ ml: 1 }} />

                    {oAuthLoading ? (
                      <CircularProgress size={20} sx={{ marginX: '10px' }} />
                    ) : null}
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ my: 1 }}>or</Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Link to="/signup" style={{ color: 'inherit' }}>
                Don&apos;t have an account? Sign Up
              </Link>
              <Link to="/forgotpassword" style={{ color: 'inherit' }}>
                Forgot password?
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
