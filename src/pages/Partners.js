import React from "react";
import marketaux from "../images/marketaux-dark.png";
import Footer from "../components/footer";
import "../components/css/partners.css";
import { Box, Typography, createTheme } from "@mui/material";
const theme = createTheme();
export default function Partners() {
  return (
    <div className="parners-page">
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "white",
              fontSize: "2.5em",
              fontWeight: "600",
              letterSpacing: "5px",
              textAlign: "center",
            }}
          >
            Our Partners
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "50px",
            marginTop: "40px",
            [theme.breakpoints.down("800")]: {
              flexDirection: "column",
            },
          }}
        >
          <a
            href="https://exchangerate.host"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Typography
              sx={{
                fontFamily: "Nunito",
                color: "white",
                fontSize: "2.5em",
                [theme.breakpoints.down("410")]: {
                  fontSize: "2.3em",
                },
                [theme.breakpoints.down("340")]: {
                  fontSize: "2em",
                },
              }}
            >
              exchangerate.host
            </Typography>
          </a>

          <a href="https://www.marketaux.com/" target="_blank" rel="noreferrer">
            <img src={marketaux} alt="marketaux" style={{}} className="logo" />
          </a>
        </Box>
      </Box>
      <Footer />
    </div>
  );
}
