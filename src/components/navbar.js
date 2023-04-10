import React, { useState } from "react";
import logo from "../images/logo.png";
import DrawerComp from "./drawer";
import {
  AppBar,
  Box,
  Tab,
  Tabs,
  Toolbar,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Navbar() {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("970"));
  const pages = ["Home", "News", "Partners", "About"];
  const routes = ["/", "news", "partners", "about"];

  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  };

  function goHome() {
    setValue(0);
  }

  return (
    <React.Fragment>
      <AppBar
        sx={{
          backgroundColor: "#15157b",
          padding: "10px",
        }}
      >
        <Toolbar>
          <Button as={Link} to={"/"}>
            <img src={logo} alt="" width={110} height={35} onClick={goHome} />
          </Button>

          {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                textColor="inherit"
                value={value}
                sx={{ marginLeft: "20px" }}
                onChange={(e, value) => setValue(value)}
                TabIndicatorProps={{ style: { background: "lightblue" } }}
              >
                {pages.map((page, index) => (
                  <Tab
                    label={page}
                    key={index}
                    sx={{
                      fontWeight: "500",
                      fontSize: "1.4em",
                      letterSpacing: "4px",
                      textDecoration: "none",
                      marginTop: "10px",
                      color: "white",
                    }}
                    as={Link}
                    to={routes[index]}
                  />
                ))}
              </Tabs>
              {token ? (
                <Button
                  sx={{
                    marginLeft: "auto",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                  onClick={() => logout()}
                  variant="contained"
                >
                  Logout
                </Button>
              ) : (
                <>
                  {" "}
                  <Button
                    sx={{
                      marginLeft: "auto",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                    variant="contained"
                    as={Link}
                    to="login"
                  >
                    Login
                  </Button>
                  <Button
                    sx={{
                      marginLeft: "10px",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                    variant="contained"
                    as={Link}
                    to="signup"
                  >
                    Signup
                  </Button>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
