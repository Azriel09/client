import React, { useState } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "./css/swiper.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function CurrencyChoose() {
  const theme = useTheme();
  const pages = [1, 2, 3, 4, 5, 6];
  const [render, setRender] = useState(true);
  const [swipePages, setSwipePages] = useState(pages);

  const addCurrency = () => {
    const last = swipePages.slice(-1)[0];
    console.log(last);
    const newList = [...swipePages, last + 1];
    setSwipePages(newList);
  };

  return (
    <Box sx={{ maxHeight: "200vh", width: "100%", marginBottom: "5vh" }}>
      {/* CURRENCIES */}
      <Box
        sx={{
          width: "100%",
          height: "350px",
          backgroundColor: "#121268",
          marginTop: "5vh",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* SWIPER */}
        <Box
          sx={{
            width: "1400px",
            height: "350px",
            marginLeft: "30px",
          }}
        >
          {render ? (
            <Swiper
              slidesPerView={5}
              spaceBetween={30}
              navigation={true}
              modules={[Pagination, Navigation]}
              style={{
                maxWidth: "1400px",
                height: "262.5px",
                paddingTop: "12vh",
              }}
              className="mySwiper"
            >
              {swipePages.map((p) => (
                <SwiperSlide className="swiper-slide">Slide {p}</SwiperSlide>
              ))}
            </Swiper>
          ) : null}
        </Box>
        <Box
          sx={{
            backgroundColor: "#007aff",
            minWidth: "256px",
            maxWidth: "256px",
            minHeight: "150px",
            maxHeight: "150px",
            marginTop: "3vh",
            marginLeft: "90px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          {" "}
          <Typography
            sx={{
              color: "white",
              fontSize: "2em",
              letterSpacing: "2px",
            }}
          >
            Add Currency
          </Typography>
          <AddCircleOutlineIcon
            sx={{ color: "white", fontSize: "3em" }}
            onClick={() => addCurrency()}
          />
        </Box>
      </Box>
    </Box>
  );
}
