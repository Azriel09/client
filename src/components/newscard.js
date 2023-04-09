import React from "react";
import { Box, Typography, Divider } from "@mui/material";

export function NewscardLeft(props) {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: "10px",
          margin: "25px 0 25px 25px",
        }}
      >
        <img src={props.image} style={{ maxWidth: "83%" }} />
        <Typography sx={{ fontWeight: "700" }}>{props.title}</Typography>
        <Typography sx={{ fontWeight: "300", color: "#6c757d" }}>
          {props.description}
        </Typography>
        <a href={props.link}>
          <Typography>Read More &gt;&gt;</Typography>
        </a>
      </Box>
      <Divider sx={{ background: "black", width: "90%" }} />
    </div>
  );
}

export function NewscardRight(props) {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          padding: "20px",
        }}
      >
        <Box sx={{ width: "10%" }}>
          <Typography
            sx={{
              fontWeight: "300",
              fontSize: "12px",
              fontFamily: "sans-serif",
            }}
          >
            JUST IN
          </Typography>
        </Box>
        <Box
          sx={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <Typography sx={{ fontWeight: "600", lineHeight: "1.2" }}>
            {props.title}
          </Typography>
          <Typography
            sx={{
              fontWeight: "300",
              fontSize: "15px",
              fontFamily: "sans-serif",
              color: "#6c757d",
            }}
          >
            {props.description}
          </Typography>
          <a href={props.link}>
            <Typography>Read More &gt;&gt;</Typography>
          </a>
        </Box>
        <Box sx={{ width: "10%" }}>
          <img
            src={props.image}
            style={{ maxWidth: "100px", height: "100px" }}
          />
        </Box>
      </Box>
      <Divider
        sx={{
          background: "black",
          width: "95%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    </div>
  );
}
