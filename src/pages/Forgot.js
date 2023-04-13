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
  Button,
  useTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import logo from "../images/logo.png";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

export default function Forgot() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const configuration = {
      method: "post",
      url: "/api/forgot",
      data: {
        email,
      },
    };

    axios(configuration)
      .then((result) => {})
      .catch((error) => {
        error = new Error();
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
            onSubmit={(e) => handleSubmit(e)}
            sx={{ mt: 1 }}
          >
            <TextField
              sx={{
                fieldset: { borderColor: "blue" },
              }}
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={(e) => handleSubmit(e)}
              sx={{ mt: 3, mb: 2 }}
            >
              Send Reset Code
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
