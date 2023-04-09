import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Typography,
  Button,
} from '@mui/material';
import Logo from '../shared/components/Logo';

export default function NotFound() {
  const navigate = useNavigate();
  const button = <Button type="button" variant="outlined" onClick={() => navigate(-1)}>Return back</Button>;
  return (
    <>
      <CssBaseline />
      <Box
        sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
      >
        <Box sx={{ p: 10 }}>
          <Logo />
        </Box>
        <Typography component="h1" variant="h5">
          Something went wrong. {button}
        </Typography>
      </Box>
    </>
  );
}
