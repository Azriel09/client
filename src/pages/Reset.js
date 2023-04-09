import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  FormControlLabel,
  TextField,
  useTheme,
  Avatar,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import logo from "../images/logo.png";
import { Link as RouterLink } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Reset() {
  const theme = useTheme();
  let search = window.location.search;

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const token = new URLSearchParams(search).get("token");
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
          <Typography sx={{ fontSize: "2em" }}>Reset Password</Typography>
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
            // onSubmit={(e) => handleSubmit(e)}
            sx={{ mt: 1 }}
          >
            <TextField
              type={showPassword ? "text" : "password"}
              sx={{
                fieldset: { borderColor: "blue" },
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
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="password-tf"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              //   onClick={(e) => handleSubmit(e)}
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
