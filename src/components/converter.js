import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  useTheme,
  InputLabel,
  MenuItem,
  FormHelperText,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import Loading from "./loading";
import Graph from "./chart";
export default function Converter() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("550"));
  const [code, setCode] = useState("");
  const [selected, setSelected] = useState("");
  const [selected2, setSelected2] = useState("");
  const [amount, setAmount] = useState("");
  const [converted, setConverted] = useState("");

  const [ongoing, setOngoing] = useState();

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

  const handleSubmit = (e) => {
    setOngoing(true);
    const configuration = {
      method: "get",
      url: `https://api.exchangerate.host/convert?amount=${amount}&from=${selected}&to=${selected2}`,
    };

    axios(configuration)
      .then((result) => {
        setConverted(result.data.result);
        setOngoing(false);
      })
      .catch((error) => {
        error = new Error();
        console.log(error);
      });
  };

  return (
    <Box sx={{ maxHeight: "200vh", width: "100%", marginBottom: "5vh" }}>
      <Box
        sx={{
          width: "100%",
          height: "350px",
          backgroundColor: "rgb(2,0,36)",
          background:
            "linear-gradient(125deg, rgba(2,0,36,1) 0%, rgba(18,27,131,1) 9%, rgba(25,39,174,1) 13%, rgba(6,178,243,1) 88%, rgba(0,212,255,1) 94%, rgba(0,212,255,1) 100%)",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            paddingTop: "16vh",
            color: "white",
            fontWeight: "600",
            fontFamily: "fantasy",
            fontSize: "2em",
            letterSpacing: "2px",
            [theme.breakpoints.down("970")]: {
              fontSize: "1.7em",
            },
            [theme.breakpoints.down("810")]: {
              paddingTop: "13vh",
            },
            [theme.breakpoints.down("420")]: {
              paddingTop: "11vh",
              fontSize: "1.5em",
            },
            [theme.breakpoints.down("380")]: {
              paddingTop: "11.5vh",
              fontSize: "1.3em",
            },
          }}
        >
          The World's most trusted Currency Exchange Info site
        </Typography>
      </Box>

      {/* WHITE BOX */}
      <Box
        sx={{
          backgroundColor: "white",
          width: "55%",
          height: "20%",
          borderRadius: "10px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "-15vh",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          [theme.breakpoints.down("970")]: {
            height: "500px",
            width: "75%",
          },
          [theme.breakpoints.down("480")]: {
            width: "95%",
            height: "500px",
          },
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
        >
          {/* FIRST OPTION */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
              marginTop: "10px",
              [theme.breakpoints.down("970")]: {
                width: "90%",
              },
            }}
          >
            <Typography sx={{ fontWeight: "600", fontSize: "1.5em" }}>
              From
            </Typography>
            <FormControl
              required
              sx={{
                margin: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                border: "3px solid lightblue",
                borderRadius: "5px",
                minWidth: "85%",
                maxWidth: "85%",
              }}
            >
              <InputLabel>Currency</InputLabel>
              <Select
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
            <TextField
              id="outlined-number"
              label="Amount"
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                border: "3px solid lightblue",
                borderRadius: "5px",
                minWidth: "85%",
                maxWidth: "85%",
              }}
            />
          </Box>
          {/* SECOND OPTION */}
          <Box
            sx={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              width: "50%",
              [theme.breakpoints.down("970")]: {
                width: "90%",
              },
            }}
          >
            <Typography sx={{ fontWeight: "600", fontSize: "1.5em" }}>
              To
            </Typography>
            <FormControl
              required
              sx={{
                margin: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                border: "3px solid lightblue",
                borderRadius: "5px",
                minWidth: "85%",
                maxWidth: "85%",
              }}
            >
              <InputLabel>Currency</InputLabel>
              <Select
                label="Currency *"
                defaultValue=""
                onChange={(e) => setSelected2(e.target.value)}
                sx={{ width: "100%" }}
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
            {ongoing ? (
              <>
                <Loading />
              </>
            ) : (
              <TextField
                label="Converted Amount"
                defaultValue={`${converted} ${selected2}`}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  border: "3px solid lightblue",
                  borderRadius: "5px",
                  minWidth: "85%",
                  maxWidth: "85%",
                }}
              />
            )}
          </Box>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{ mt: 3, mb: 2, marginTop: "3vh", width: "50%" }}
        >
          Convert
        </Button>
      </Box>
      {/* GRAPH */}
      {/* Chart wont show up in mobile unless browsing in landscape mode*/}
      {isMatch ? null : (
        <Box sx={{ marginTop: "20px", padding: "30px" }}>
          <Graph from={selected} to={selected2} />
        </Box>
      )}
    </Box>
  );
}