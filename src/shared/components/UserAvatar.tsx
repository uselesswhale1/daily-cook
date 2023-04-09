import React from 'react';
import { AvatarProps } from '@mui/material/Avatar/Avatar';
import { Avatar } from '@mui/material';
import stringAvatar from '../utils/stringAvatar';
import { Size } from '../enums/size.enum';

export default function UserAvatar({
  name = '? ?',
  alt = undefined,
  classes = undefined,
  size = Size.MEDIUM,
  src = undefined,
  sx = {},
  variant = undefined,
  // eslint-disable-next-line react/require-default-props
}: AvatarProps & { name?: string, size?: Size }) {
  const sizes = {
    [Size.SMALL]: {
      width: '30px',
      height: '30px',
      fontSize: '1rem',
    },
    [Size.MEDIUM]: {
      width: '50px',
      height: '50px',
      fontSize: '1.25rem',
    },
    [Size.LARGE]: {
      width: '100px',
      height: '100px',
      fontSize: '1.75rem',
    },
    [Size.EXTRA_LARGE]: {
      width: '150px',
      height: '150px',
      fontSize: '2.5rem',
    },
  };

  return (
    <Avatar
      {...stringAvatar(name)}
      src={src}
      classes={classes}
      variant={variant}
      alt={alt}
      sx={{
        ...sizes[size],
        ...sx,
      }}
    />
  );
}
