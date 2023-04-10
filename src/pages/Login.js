import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Link,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Button,
  useTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import logo from "../images/logo.png";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export default function Login() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const configuration = {
      method: "post",
      // url: "/api/login",
      url: "http://localhost:8000/login",
      data: {
        email,
        password,
        remember,
      },
    };

    axios(configuration)
      .then((result) => {
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });

        window.location.href = "/auth";

        setLogin(true);
      })
      .catch((error) => {
        error = new Error();
        setIsFormInvalid(true);
      });
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            marginTop: "10vh",
            width: "40%",
            minHeight: "65%",
            maxHeight: "85%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.6)",
            borderRadius: "10px",
            [theme.breakpoints.down("1000")]: {
              width: "60%",
            },
            [theme.breakpoints.down("570")]: {
              width: "75%",
            },
            [theme.breakpoints.down("500")]: {
              width: "98%",
            },
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "blue", marginTop: "0" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography sx={{ fontSize: "2em" }}>Sign In</Typography>
          <Link component={RouterLink} to="/">
            <img
              alt="logo"
              src={logo}
              style={{
                margin: "25px 0",
                width: "125px",
                backgroundColor: "blue",
                paddingTop: "5px",
                borderRadius: "10px",
                paddingRight: "7px",
              }}
            />
          </Link>
          <Box
            component="form"
            noValidate
            onSubmit={(e) => handleSubmit(e)}
            sx={{ mt: 1 }}
          >
            <TextField
              sx={{
                fieldset: { borderColor: "blue" },
                width: "100%",
              }}
              error={isFormInvalid}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              type={showPassword ? "text" : "password"}
              sx={{
                fieldset: { borderColor: "blue" },
                width: "100%",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              fullWidth
              error={isFormInvalid}
              helperText={isFormInvalid && "Invalid input credentials"}
              required
              name="password"
              label="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    key={Math.random()}
                    value="remember"
                    color="primary"
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={(e) => handleSubmit(e)}
                sx={{
                  marginTop: 3,
                  marginBottom: 2,
                  width: "65%",
                  [theme.breakpoints.down("500")]: {
                    marginTop: 0,
                  },
                }}
              >
                Sign In
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "65%",
              [theme.breakpoints.down("790")]: {
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            {" "}
            <Link
              component={RouterLink}
              to="/forgot"
              sx={{
                fontSize: "20px",
                width: "50%",
                [theme.breakpoints.down("790")]: {
                  textAlign: "center",
                  marginBottom: "20px",
                  width: "100%",
                },
              }}
            >
              Forgot password?
            </Link>
            <Link
              component={RouterLink}
              to="/signup"
              sx={{
                width: "50%",
                fontSize: "20px",
                textAlign: "right",
                [theme.breakpoints.down("790")]: {
                  textAlign: "center",
                  width: "100%",
                },
              }}
            >
              Don't have an account? Sign Up
            </Link>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
