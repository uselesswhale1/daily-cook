import React from 'react';
import { useSnackbar, VariantType } from 'notistack';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const useSnackbarMessage = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showMessageByType = (type: VariantType, message: string) => {
    enqueueSnackbar(message, {
      variant: type,
      action: (snackbarId) => (
        <IconButton
          size="small"
          color="inherit"
          onClick={() => { closeSnackbar(snackbarId); }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      ),
    });
  };

  const showSuccessMessage = (message: string) => {
    showMessageByType('success', message);
  };

  const showWarningMessage = (message: string) => {
    showMessageByType('warning', message);
  };

  const showInfoMessage = (message: string) => {
    showMessageByType('info', message);
  };

  const showErrorMessage = (message: string) => {
    showMessageByType('error', message);
  };

  const showMessage = (message: string) => {
    showMessageByType('default', message);
  };

  return {
    showMessage,
    showErrorMessage,
    showInfoMessage,
    showWarningMessage,
    showSuccessMessage,
  };
};

export default useSnackbarMessage;
