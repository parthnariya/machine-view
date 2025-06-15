import type { ReactNode } from 'react';

import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink as RouterNavLink } from 'react-router';

type NavLinkPropType = {
  to: string;
  prefixIcon?: ReactNode;
  postfixIcon?: ReactNode;
  label: string;
};

export const NavLink = ({
  to,
  postfixIcon,
  label,
  prefixIcon,
}: NavLinkPropType) => {
  return (
    <ListItem
      component={RouterNavLink}
      to={to}
      sx={{
        textDecoration: 'none',
        '&.active': {
          backgroundColor: (theme) => theme.palette.action.selected,
        },
      }}
    >
      {prefixIcon && <ListItemIcon>{prefixIcon}</ListItemIcon>}
      <ListItemText primary={label} />
      {postfixIcon && <ListItemIcon>{postfixIcon}</ListItemIcon>}
    </ListItem>
  );
};
