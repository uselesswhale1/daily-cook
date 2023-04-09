import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Divider,
  CircularProgress,
} from '@mui/material';
import bgUrl from '../assets/images/image-2.jpg';
import Logo from '../shared/components/Logo';
import MotivationFoodQuote from '../shared/components/MotivationFoodQuote';
import { useForm } from '../hooks/useForm/useForm';
import { forgotPassword } from '../api/auth.api';
import useSnackbarMessage from '../hooks/useSnackbarMessage/useSnackbarMessage';
import { AuthErrorCode } from '../shared/enums/error-code.enum';
import { ErrorList } from '../shared/constants/error-list';

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const { showErrorMessage, showInfoMessage } = useSnackbarMessage();
  const initialForm = {
    email: '',
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const { email } = formData;

    forgotPassword(email)
      .finally(() => {
        resetForm();
        setLoading(false);
      })
      .then(() => {
        showInfoMessage('A password reset link has been sent to your email address');
      })
      .catch(({ code }: { code: AuthErrorCode}) => {
        showErrorMessage(ErrorList[code] || ErrorList.default);
      });
  };

  function resetForm() {
    setFormData(initialForm);
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
          backgroundImage: `url(${bgUrl})`,
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
          }}
          >
            <Typography variant="h6" align="left">
              <MotivationFoodQuote />
            </Typography>
            <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
              Password Recovery
            </Typography>
            <Typography variant="body1" component="p" sx={{ mb: 4 }}>
              Forgot your password? Don&apos;t worry, let&apos;s recover it!
            </Typography>
            <Box
              component="form"
              name="form"
              noValidate
              onSubmit={handleSubmit}
            >
              <TextField
                error={hasError('email')}
                fullWidth
                autoFocus
                autoComplete="email"
                disabled={loading}
                value={formData.email}
                onChange={handleChange('email')}
                label="Enter Email"
                placeholder="Enter Email"
                helperText={formErrors && formErrors.email}
                sx={{ mb: 3 }}
              />
              <Grid
                container
                columns={{
                  xs: 12, sm: 12, md: 12, lg: 12,
                }}
                sx={{
                  justifyContent: 'space-evenly',
                }}
              >
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={!isValidForm}
                >
                  Recover password

                  {loading ? (
                    <CircularProgress size={20} sx={{ marginX: '10px' }} />
                  ) : null}
                </Button>
              </Grid>
            </Box>
            <Divider sx={{ my: 1 }}>or</Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Link to="/signin" style={{ color: 'inherit' }}>
                Remembered the password? Sign In
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
