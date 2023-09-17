import React from "react";
import logo from "../images/logo.png";
import {
  Link,
  Typography,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import DiamondIcon from "@mui/icons-material/Diamond";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        RyoEx
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.down("md"));
  return (
    // Parent
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "300px",
        backgroundColor: "white",
      }}
    >
      {/* First Box */}

      {isMD ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            marginTop: "5px",
          }}
        >
          <a href="https://www.facebook.com" className="me-4 text-reset">
            <FacebookIcon sx={{ color: "#6c757d", fontSize: "30px" }} />
          </a>
          <a href="https://www.twitter.com" className="me-4 text-reset">
            <TwitterIcon sx={{ color: "#6c757d", fontSize: "30px" }} />
          </a>
          <a href="https://www.instagram.com" className="me-4 text-reset">
            <InstagramIcon sx={{ color: "#6c757d", fontSize: "30px" }} />
          </a>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
            margin: "10px",
          }}
        >
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Typography sx={{ color: "#6c757d", fontSize: "18px" }}>
              Get connected with us on social networks:
            </Typography>
          </Box>
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "20px",
            }}
          >
            <a href="https://www.facebook.com" className="me-4 text-reset">
              <FacebookIcon sx={{ color: "#6c757d", fontSize: "30px" }} />
            </a>
            <a href="https://www.twitter.com" className="me-4 text-reset">
              <TwitterIcon sx={{ color: "#6c757d", fontSize: "30px" }} />
            </a>
            <a href="https://www.instagram.com" className="me-4 text-reset">
              <InstagramIcon sx={{ color: "#6c757d", fontSize: "30px" }} />
            </a>
          </Box>
        </Box>
      )}
      <Divider sx={{ marginTop: "5px" }} />
      {/* 2nd Box */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          padding: "35px",
          height: "200px",
          [theme.breakpoints.down("730")]: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "20px 0 20px 0",
            gap: "25px",
          },
        }}
      >
        <Box
          sx={{
            width: "33%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            [theme.breakpoints.down("730")]: {
              width: "100%",
              gap: "10px",
            },
          }}
        >
          <DiamondIcon sx={{ color: "#6c757d", fontSize: "30px" }} />
          <Typography sx={{ color: "#6c757d", fontWeight: "600" }}>
            RYOEX
          </Typography>
        </Box>
        <Box
          sx={{
            width: "33%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: "auto",
            [theme.breakpoints.down("730")]: {
              width: "100%",
              gap: "5px",
            },
          }}
        >
          <Typography sx={{ color: "#6c757d", fontWeight: "600" }}>
            USEFUL LINKS
          </Typography>
          <a href="/news" style={{ color: "#6c757d" }}>
            News
          </a>
          <a href="/partners" style={{ color: "#6c757d" }}>
            Partners
          </a>
          <a href="/about" style={{ color: "#6c757d" }}>
            About
          </a>
        </Box>
        <Box
          sx={{
            width: "33%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#6c757d",
            marginLeft: "auto",
            marginRight: "auto",
            [theme.breakpoints.down("730")]: {
              width: "100%",
              alignItems: "center",
              gap: "5px",
              marginBottom: "10px",
            },
          }}
        >
          <Typography sx={{ color: "#6c757d", fontWeight: "600" }}>
            CONTACTS
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            Metro Manila, Philippines
            <HomeIcon />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            ryoex.cc@gmail.com
            <EmailIcon />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            + 01 234 567 88
            <CallIcon />
          </Box>
        </Box>
      </Box>

      {/* 3rd Box */}
      <Box>
        <Copyright />
      </Box>
    </Box>
  );
}
