import React, { useEffect } from 'react';
import firebase from 'firebase/compat';
import {
  Routes, Route,
} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack/';

import GuardedRoute from './shared/hoc/GuardRoute';
import useAuthStore from './storage/useAuthStore';
import { auth } from './configs/firebase.config';

import Main from './layouts/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';

import Profile from './components/Profile';
import Feed from './components/Feed';
import SavedRecipes from './components/SavedRecipes';
import Recipe from './components/Recipe';
import ShoppingList from './components/ShoppingList';

import useUserStore from './storage/useUserStore';

const theme = createTheme(
  {
    typography: {
      fontSize: 14,
      button: {
        fontSize: 16,
      },
    },
  },
);

function App() {
  const [isAuthorization, resetToken] = useAuthStore((state) => [
    state.isAuthorization,
    state.resetToken,
  ]);

  const [removeCurrentUser] = useUserStore((state) => [
    state.removeCurrentUser,
  ]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        resetToken();
        removeCurrentUser();
      }
    });

    return unsubscribe;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        maxSnack={3}
      >
        <Routes>
          <Route path="/" element={<GuardedRoute isAuth={isAuthorization()}><Main /></GuardedRoute>}>
            <Route index element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="feed" element={<Feed />} />
            <Route path="recipes/:recipeId" element={<Recipe />} />
            <Route path="recipe" element={<Recipe />} />
            <Route path="saved" element={<SavedRecipes />} />
            <Route path="list" element={<ShoppingList />} />
          </Route>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
