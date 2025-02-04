import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import React from "react";

interface NavItemProps {
  text: string;
  icon: React.ReactNode;
  open: boolean;
  active: boolean;
  theme: Theme;
  onClick: (text: string) => void;
}

export const NavItem: React.FC<NavItemProps> = ({
  text,
  icon,
  open,
  active,
  theme,
  onClick,
}) => (
  <ListItem disablePadding sx={{ display: "block" }}>
    <ListItemButton
      sx={{
        minHeight: 48,
        justifyContent: open ? "initial" : "center",
        px: 2.5,
      }}
      onClick={() => onClick(text)}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : "auto",
          justifyContent: "center",
          color: active ? theme.palette.primary.main : "inherit",
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
    </ListItemButton>
  </ListItem>
);
