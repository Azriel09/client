import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  useTheme,
  InputLabel,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";

export default function DashboardOptions({ getSelected }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState("");
  const [selected2, setSelected2] = useState("");
  useEffect(() => {
    fetch("https://api.exchangerate.host/symbols")
      .then((res) => res.json(res))
      .then((data) => {
        setCode(data.symbols);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  useEffect(() => {
    if (selected && selected2) {
      getSelected([selected, selected2]);
    } else {
      return;
    }
  }, [selected, selected2]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
        }}
      >
        <Typography>Base Currency</Typography>
        <FormControl
          required
          error={error}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            border: "3px solid lightblue",
            borderRadius: "5px",
            width: "100%",
          }}
        >
          <InputLabel>Currency</InputLabel>
          <Select
            required
            label="Currency *"
            defaultValue=""
            onChange={(e) => setSelected(e.target.value)}
          >
            {Object.entries(code).map(([key, value]) => {
              return (
                <MenuItem value={key} key={key}>
                  {key} - {value.description}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
        }}
      >
        <Typography>Converted Currency</Typography>
        <FormControl
          required
          sx={{
            margin: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            border: "3px solid lightblue",
            borderRadius: "5px",
            width: "100%",
          }}
        >
          <InputLabel>Currency</InputLabel>
          <Select
            required
            label="Currency *"
            defaultValue=""
            onChange={(e) => setSelected2(e.target.value)}
          >
            {Object.entries(code).map(([key, value]) => {
              return (
                <MenuItem value={key} key={key}>
                  {key} - {value.description}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
