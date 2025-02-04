import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { navigationItems } from "../../config/navigation";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { NavItem } from "./NavItem";
import { AppBar, Drawer, DrawerHeader } from "./styles";

interface SideBarProps {
  title: string;
  component: React.ReactNode;
}

export const SideBar: React.FC<SideBarProps> = ({ title, component }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigation = useNavigate();
  const { width } = useWindowDimensions();
  const [activeTab, setActiveTab] = React.useState("Map");

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const onClickHandler = (text: string) => {
    setActiveTab(text);
    const item = navigationItems.find((item) => item.text === text);
    if (item) {
      navigation(item.path);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navigationItems.map((item) => (
            <NavItem
              key={item.text}
              text={item.text}
              icon={item.icon}
              open={open}
              active={activeTab === item.text}
              theme={theme}
              onClick={onClickHandler}
            />
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }} style={{ width: width * 0.7 }}>
        {component}
      </Box>
    </Box>
  );
};
