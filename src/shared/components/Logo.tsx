import React from 'react';
import { Typography, Box } from '@mui/material';

import logoSizes from '../constants/logo-sizes.constants';

export default function Logo({ hasSlogan, size = logoSizes.lg }: any) {
  const icon = <span className="material-symbols-outlined" style={{ verticalAlign: 'top' }}>cookie</span>;
  const logo = (
    <Typography variant={size} fontFamily="Koulen" align="center">
      DAILY COOK{icon}
    </Typography>
  );
  return (
    <Box>
      {logo}
      {hasSlogan
        ? (
          <Typography variant="h6" align="center">
            Stay healthy!
          </Typography>
        )
        : null}
    </Box>
  );
}
