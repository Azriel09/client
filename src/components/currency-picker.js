import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "./css/swiper.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DashboardOptions from "./dashboard-options";
import axios from "axios";
import Loading from "./loading";
import Cookies from "universal-cookie";
import DashboardGraph from "./dashboard-graph";

const cookies = new Cookies();
export default function CurrencyChoose() {
  const token = cookies.get("TOKEN");
  const theme = useTheme();
  const pages = [];
  const rates = [];
  const [selected, setSelected] = useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [render, setRender] = useState(false);
  const [swipePages, setSwipePages] = useState(pages);
  const [noSelected, setNoSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rate, setRate] = useState(rates);
  const [newRate, setNewRate] = useState([]);

  const [showChart, setShowChart] = useState(false);
  const [toPass, setToPass] = useState();

  useEffect(() => {
    const configuration = {
      method: "get",
      url: "/api/dashboard",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(configuration)
      .then((result) => {
        setSwipePages(result.data);
        console.log(result.data);
        if (result.data.length >= 1) {
          result.data.map((r) => getRate(r));
          setRender(true);
        } else {
          return;
        }
      })
      .catch((error) => {
        error = new Error();
      });
  }, [loading]);

  const yesterDate = moment().subtract(1, "day").format("YYYY-MM-DD");
  const dateBeforeYesterdate = moment().subtract(2, "day").format("YYYY-MM-DD");

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const getRate = (s1) => {
    const first = s1[0];
    const second = s1[1];

    const link = `https://api.exchangerate.host/fluctuation?start_date=${yesterDate}&end_date=${dateBeforeYesterdate}&base=${first}&symbols=${second}`;

    const configuration = {
      method: "get",
      url: link,
    };

    axios(configuration)
      .then((result) => {
        for (const [key, value] of Object.entries(result.data.rates)) {
          const newRate = value.change_pct;
          rates.push(newRate);
          const newRateList = [...rate, newRate];
          setNewRate(newRateList);
        }
      })
      .catch((error) => {
        error = new Error();
        console.log(error);
      });
  };

  const getSelected = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const saveToProfile = (newList) => {
    console.log(newList);
    const configuration = {
      method: "get",
      url: "/api/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`,
        currency: [newList],
      },
    };
    axios(configuration)
      .then((result) => {})
      .catch((error) => {
        error = new Error();
        console.log(error);
      });
  };

  async function fetchData() {
    setLoading(true);
    const link = `https://api.exchangerate.host/fluctuation?start_date=${yesterDate}&end_date=${dateBeforeYesterdate}&base=${selected[0]}&symbols=${selected[1]}`;
    console.log(selected[0], selected[1]);
    try {
      const response = await fetch(link);
      const result = await response.json();
      console.log(result);
      for (const [key, value] of Object.entries(result.rates)) {
        const newRate = value.change_pct;
        const newRateList = [...rate, newRate];
        setRate(newRateList);
        console.log(newRate);
        const newCodes = [...swipePages, [selected[0], selected[1]]];
        setSwipePages(newCodes);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
    setSelected([]);
    handleClose();

    saveToProfile([selected[0], selected[1]]);
  }

  const deleteCurrency = (e) => {
    setRender(false);
    const index = e.currentTarget.value;

    const tempoList = swipePages;
    const spliceList = swipePages.splice(index, 1);

    const newList = [...tempoList];
    console.log(newList);
    setSwipePages(newList);

    const tempoRate = rate;
    const spliceRate = rate.splice(index, 1);
    const newRate = [...tempoRate];
    setRate(newRate);
    setRender(true);

    const configuration = {
      method: "get",
      url: "/api/delete",
      headers: {
        Authorization: `Bearer ${token}`,
        currency: newList,
      },
    };
    axios(configuration)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        error = new Error();
        console.log(error);
      });
  };

  const checkPositive = (p, index) => {
    // const tempoRate = rate;
    // const first = tempoRate.splice(-1);
    // const second = tempoRate.splice(-2);
    // console.log(first, second);

    if (rate[index] >= 0) {
      return (
        <div>
          <SwiperSlide className="swiper-slide" key={index} value="gg">
            <Button
              value={[p[0], p[1]]}
              sx={{ width: "100%", height: "100%" }}
              onClick={(e) => setChart([e.currentTarget.value])}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "lightgreen",
                  gap: "10px",
                }}
              >
                <Typography sx={{ fontSize: "1.5em", color: "white" }}>
                  {p[0]}/{p[1]}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "2em" }}>
                    {rate[index]}%
                  </Typography>
                  <ArrowUpwardIcon />
                </Box>
              </Box>
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                sx={{ marginLeft: "auto", marginRight: "auto" }}
                className="button-doko"
                value={index}
                onClick={(e) => deleteCurrency(e)}
              >
                <CloseIcon
                  sx={{ color: "white", width: "35px", height: "35px" }}
                />
              </Button>
            </Box>
          </SwiperSlide>
        </div>
      );
    } else {
      return (
        <div>
          <SwiperSlide className="swiper-slide" key={index} value="GG1">
            <Button
              value={[p[0], p[1]]}
              sx={{ width: "100%", height: "100%" }}
              onClick={(e) => setChart([e.currentTarget.value])}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "red",
                  gap: "10px",
                }}
              >
                <Typography sx={{ fontSize: "1.5em", color: "white" }}>
                  {" "}
                  {p[0]}/{p[1]}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "2em" }}>
                    {rate[index]}%
                  </Typography>
                  <ArrowDownwardIcon />
                </Box>
              </Box>
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                className="button-doko"
                value={index}
                onClick={(e) => deleteCurrency(e)}
              >
                <CloseIcon
                  sx={{ color: "white", width: "35px", height: "35px" }}
                />
              </Button>
            </Box>
          </SwiperSlide>
        </div>
      );
    }
  };

  const setChart = (value) => {
    setTimeout(setShowChart(false), 500);
    setShowChart(true);
    setToPass(value);
  };

  return (
    <>
      <Box
        sx={{
          maxHeight: "200vh",
          width: "100%",
        }}
      >
        {/* CURRENCIES */}
        <Box
          sx={{
            width: "100%",
            height: "350px",
            backgroundColor: "#121268",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            [theme.breakpoints.down("520")]: {
              flexDirection: "column",
              justifyContent: "center",
              height: "550px",
            },
          }}
        >
          {/* SWIPER */}

          {render ? (
            <Box
              sx={{
                maxWidth: "1400px",
                height: "262.5px",
                diplay: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20vh",
                marginLeft: "10px",
                marginRight: "10px",
                [theme.breakpoints.down("520")]: {
                  marginTop: "10vh",
                  height: "200px",
                },
                [theme.breakpoints.up("260")]: {
                  width: "260px",
                },
                [theme.breakpoints.up("920")]: {
                  width: "630px",
                },
                [theme.breakpoints.up("1235")]: {
                  width: "945px",
                },
                [theme.breakpoints.up("1570")]: {
                  width: "1280px",
                },
                [theme.breakpoints.up("1850")]: {
                  width: "1650px",
                },
              }}
            >
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                breakpoints={{
                  920: {
                    slidesPerView: 2,
                  },
                  1235: {
                    slidesPerView: 3,
                  },
                  1570: {
                    slidesPerView: 4,
                  },
                  1850: {
                    slidesPerView: 5,
                  },
                }}
              >
                {loading ? null : (
                  <>{swipePages.map((p, index) => checkPositive(p, index))}</>
                )}
              </Swiper>
            </Box>
          ) : null}

          {/* BUTTON */}
          <Box
            sx={{
              minWidth: "256px",
              maxWidth: "256px",
              height: "262.5px",
              diplay: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20vh",
              marginLeft: "10px",

              [theme.breakpoints.down("520")]: {
                marginTop: "10px",
                marginLeft: "0",
              },
            }}
          >
            <Box
              sx={{
                minHeight: "150px",
                maxHeight: "150px",
                backgroundColor: "#007aff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "2em",
                  letterSpacing: "2px",
                  textAlign: "center",
                }}
              >
                Add Currency
              </Typography>
              <AddCircleOutlineIcon
                sx={{ color: "white", fontSize: "3em" }}
                onClick={handleClickOpen}
              />
            </Box>
          </Box>
        </Box>
        {showChart ? <DashboardGraph pass={toPass} /> : null}
      </Box>

      {/* ADD CURRENCY POP UP */}
      {loading ? (
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogContent sx={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
            <Loading />
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>Choose a currency to save</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Choose a currency to instantly view it the moment you open this
              website
            </DialogContentText>
            <DashboardOptions
              getSelected={getSelected}
              noSelected={noSelected}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={(e) => fetchData(e)}>Confirm</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
