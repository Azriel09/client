import React from "react";
import Footer from "../components/footer";
import { Box } from "@mui/material";
import Converter from "../components/converter";
export default function Home() {
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
        <Converter />
      </Box>
      <Footer></Footer>
    </div>
  );
}
