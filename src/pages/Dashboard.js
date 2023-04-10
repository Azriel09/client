import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Footer from "../components/footer";
import Background from "../images/blue-background.png";
import CurrencyChoose from "../components/currency-picker";
export default function Dashboard() {
  const theme = useTheme();
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "200%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CurrencyChoose />
      </Box>
      <Footer />
    </div>
  );
}
