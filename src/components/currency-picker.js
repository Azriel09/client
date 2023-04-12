import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "./css/swiper.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DashboardOptions from "./dashboard-options";
import axios from "axios";
import Loading from "./loading";
import Cookies from "universal-cookie";

function useForceUpdate() {
  let [value, setState] = useState(true);
  return () => setState(!value);
}

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

  useEffect(() => {
    const configuration = {
      method: "get",
      url: "http://localhost:8000/dashboard",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(configuration)
      .then((result) => {
        setSwipePages(result.data);
        console.log(result.data);
        result.data.map((r) => getRate(r[0]));
        setRender(true);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  const yesterDate = moment().subtract(1, "day").format("YYYY-MM-DD");
  const dateBeforeYesterdate = moment().subtract(2, "day").format("YYYY-MM-DD");
  const handleForceupdateMethod = useForceUpdate();

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const getRate = (s1) => {
    const first = s1.split(",")[0];
    const second = s1.split(",")[1];

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
          setRate(newRateList);
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
    const configuration = {
      method: "get",
      url: "http://localhost:8000/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`,
        currency: newList,
      },
    };
    axios(configuration)
      .then((result) => {})
      .catch((error) => {
        error = new Error();
        console.log(error);
      });
  };
  const addCurrency = () => {
    setLoading(true);
    const link = `https://api.exchangerate.host/fluctuation?start_date=${yesterDate}&end_date=${dateBeforeYesterdate}&base=${selected[0]}&symbols=${selected[1]}`;
    console.log(link);
    if (selected.length === 0) {
      setNoSelected(true);
      return;
    }
    const configuration = {
      method: "get",
      url: link,
    };

    axios(configuration)
      .then((result) => {
        for (const [key, value] of Object.entries(result.data.rates)) {
          const newRate = value.change_pct;

          const newRateList = [...rate, newRate];
          setRate(newRateList);
        }
      })
      .catch((error) => {
        error = new Error();
        console.log(error);
      });
    const last = swipePages.slice(-1)[0];
    const newList = [...swipePages, [selected[0], selected[1]]];
    setSwipePages(newList);
    setSelected([]);
    handleClose();
    setLoading(false);
    saveToProfile([selected[0], selected[1]]);
    setTimeout(() => {
      handleForceupdateMethod();
    }, 500);
  };

  const deleteCurrency = (e) => {
    setRender(false);
    const index = e.currentTarget.value;

    const tempoList = swipePages;
    const spliceList = swipePages.splice(index, 1);
    const newList = [...tempoList];
    setSwipePages(newList);

    const tempoRate = rate;
    const spliceRate = rate.splice(index, 1);
    const newRate = [...tempoRate];
    setRate(newRate);
    setRender(true);

    const configuration = {
      method: "get",
      url: "http://localhost:8000/delete",
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
    if (rate[index] >= 0) {
      return (
        <SwiperSlide className="swiper-slide" key={index}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "lightgreen",
              gap: "30px",
            }}
          >
            <Typography>{p}</Typography>
            <Typography>{rate[index]}%</Typography>
            <Button value={index} onClick={(e) => deleteCurrency(e)}>
              <DeleteIcon sx={{ color: "white" }} />
            </Button>
          </Box>
        </SwiperSlide>
      );
    } else {
      return (
        <SwiperSlide className="swiper-slide">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "red",
              gap: "30px",
            }}
          >
            <Typography>{p}</Typography>
            <Typography>{rate[index]}%</Typography>
            <Button value={index} onClick={(e) => deleteCurrency(e)}>
              <DeleteIcon sx={{ color: "white" }} />
            </Button>
          </Box>
        </SwiperSlide>
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          maxHeight: "200vh",
          width: "100%",
          marginBottom: "5vh",
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
                {loading ? (
                  <Loading />
                ) : (
                  swipePages.map((p, index) => checkPositive(p, index))
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
        <Box
          sx={{ width: "100%", height: "500px", backgroundColor: "gray" }}
        ></Box>
      </Box>

      {/* ADD CURRENCY POP UP */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Choose a currency to save</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose a currency to instantly view it the moment you open this
            website
          </DialogContentText>
          <DashboardOptions getSelected={getSelected} noSelected={noSelected} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => addCurrency()}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
