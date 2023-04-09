import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Avatar,
  Link,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import logo from "../images/logo.png";

export default function Signup() {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
            maxHeight: "100%",
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
              marginTop: "5vh",
            },
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "blue", marginTop: "0" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography sx={{ fontSize: "2em" }}>Register</Typography>
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
            validate
            //   onSubmit={(e) => handleSubmit(e)}
            sx={{
              mt: 1,
              width: "65%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              [theme.breakpoints.down("350")]: {
                width: "80%",
              },
            }}
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
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <TextField
              sx={{
                fieldset: { borderColor: "blue" },
                width: "100%",
                marginBottom: "15px",
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
                      //   onClick={handleClickShowPassword}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // onClick={(e) => handleSubmit(e)}
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
          <Link
            component={RouterLink}
            to="/login"
            sx={{
              width: "50%",
              fontSize: "20px",
              textAlign: "center",
              marginBottom: "20px",
              [theme.breakpoints.down("790")]: {
                textAlign: "center",
                width: "100%",
              },
            }}
          >
            Already have an account? Sign in here
          </Link>
        </Box>
      </Box>
    </div>
  );
}
