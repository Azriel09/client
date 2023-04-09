import { Box, Typography, createTheme } from "@mui/material";
import React from "react";
import Footer from "../components/footer";
const theme = createTheme();
export default function About() {
  return (
    <div className="about-page">
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "100px",
          [theme.breakpoints.down("900")]: {
            flexDirection: "column",
          },
          [theme.breakpoints.down("470")]: {
            gap: "50px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "350px",
            maxWidth: "350px",
            border: "15px solid #2279dc",
            padding: "20px",
            [theme.breakpoints.down("470")]: {
              minWidth: "300px",
              maxWidth: "300px",
            },
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: "600",
              letterSpacing: "3px",
              fontSize: "2.5em",
              marginBottom: "3vh",
              textAlign: "center",
              [theme.breakpoints.down("380")]: {
                marginBottom: "1vh",
              },
            }}
          >
            About Us
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontSize: "1.4em",
              textAlign: "center",
              [theme.breakpoints.down("380")]: {
                fontSize: "1.2em",
              },
            }}
          >
            RyoEX gives you the power of our most up to date, reputable currency
            information and offer you secure, reliable, easy to use website
            dedicated to making your life easier.
          </Typography>
        </Box>
        <Box sx={{ minWidth: "350px", maxWidth: "350px" }}>
          <Typography
            sx={{
              fontSize: "1.4em",
              color: "white",
              letterSpacing: "2px",
              textAlign: "center",
              [theme.breakpoints.down("380")]: {
                fontSize: "1.2em",
              },
            }}
          >
            Founded by Jhan Marmel C. Ubay, the company was born out of the
            belief that the Internet and technology would open up the markets
            for accurate currency data
          </Typography>
        </Box>
      </Box>
      <Footer />
    </div>
  );
}
