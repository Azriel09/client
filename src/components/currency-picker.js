import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

export default function CurrencyChoose() {
  const theme = useTheme();
  return (
    <Box sx={{ maxHeight: "200vh", width: "100%", marginBottom: "5vh" }}>
      <Box
        sx={{
          width: "100%",
          height: "350px",
          backgroundColor: "rgb(2,0,36)",
          background:
            "linear-gradient(120deg, rgba(2,0,36,1) 0%, rgba(18,27,131,1) 17%, rgba(25,39,174,1) 34%, rgba(20,103,194,1) 45%, rgba(17,144,206,1) 50%, rgba(14,173,215,1) 57%, rgba(13,159,219,1) 62%, rgba(11,173,224,1) 67%, rgba(10,198,229,1) 79%, rgba(6,178,243,1) 88%, rgba(0,212,255,1) 94%, rgba(0,212,255,1) 100%)",
        }}
      ></Box>

      <Box
        sx={{
          backgroundColor: "white",
          width: "90%",
          height: "1000px",
          borderRadius: "10px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "-15vh",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "90%",
            [theme.breakpoints.down("970")]: {
              flexDirection: "column",
            },
            [theme.breakpoints.down("480")]: {
              width: "100%",
            },
          }}
        ></Box>
      </Box>
    </Box>
  );
}
