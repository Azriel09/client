import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Cookies from "universal-cookie";
const DrawerComp = () => {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const [openDrawer, setOpenDrawer] = useState(false);
  const pages = ["Home", "News", "Partners", "About"];
  const loggedIn = ["Home", "News", "Partners", "About", "Dashboard"];
  const loggedRoutes = ["/", "news", "partners", "about", "dashboard"];
  const routes = ["/", "news", "partners", "about"];
  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  };
  return (
    <React.Fragment>
      <Drawer
        anchor="top"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          {token
            ? loggedIn.map((page, index) => (
                <ListItemButton key={index} as={Link} to={loggedRoutes[index]}>
                  <ListItemIcon>
                    <ListItemText>{page}</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              ))
            : pages.map((page, index) => (
                <ListItemButton key={index} as={Link} to={routes[index]}>
                  <ListItemIcon>
                    <ListItemText>{page}</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              ))}

          {token ? (
            <>
              <ListItemButton onClick={() => logout()}>
                <ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </>
          ) : (
            <>
              <ListItemButton as={Link} to="login">
                <ListItemIcon>
                  <ListItemText>Login</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton as={Link} to="register">
                <ListItemIcon>
                  <ListItemText>Register</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </>
          )}
        </List>
      </Drawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        sx={{ marginLeft: "auto" }}
      >
        <MenuIcon sx={{ color: "white" }} />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
