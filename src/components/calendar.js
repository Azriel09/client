import React, { useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Box, Typography } from "@mui/material";
import moment from "moment";

export default function Calendar({ getDate }) {
  const currentYear = moment().add(1, "second").format("YYYY-MM-DD");
  const [pickedDate, setPickedDate] = useState(`${currentYear}`);

  const datePicked = (e) => {
    const tempoDay = `${e._d.getDate()}`;
    const tempoMonth = `${e._d.getMonth() + 1}`;
    const year = e._d.getFullYear();

    if (tempoDay.length === 1 && tempoMonth.length === 1) {
      let day = `0${tempoDay}`;
      let month = `0${tempoMonth}`;
      const fullDate = `${year}-${month}-${day}`;
      setPickedDate(fullDate);
      getDate(fullDate);
    } else if (tempoMonth.length === 1) {
      let month = `0${tempoMonth}`;
      const fullDate = `${year}-${month}-${tempoDay}`;
      setPickedDate(fullDate);
      getDate(fullDate);
    } else if (tempoDay.length === 1) {
      let day = `0${tempoDay}`;
      const fullDate = `${year}-${tempoMonth}-${day}`;
      setPickedDate(fullDate);
      getDate(fullDate);
    } else {
      const fullDate = `${year}-${tempoMonth}-${tempoDay}`;
      setPickedDate(fullDate);
      getDate(fullDate);
    }
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Typography sx={{ fontWeight: "600" }}>
          View Exchange Rate on a specific Date
        </Typography>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <StaticDatePicker
            defaultValue={moment(currentYear)}
            onChange={(e) => datePicked(e)}
          />
        </LocalizationProvider>
      </Box>
    </div>
  );
}
