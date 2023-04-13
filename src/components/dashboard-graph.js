import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Chart from "react-apexcharts";
import moment from "moment";
export default function DashboardGraph(props) {
  const [currenc, setCurrenc] = useState("");
  const [dates, setDates] = useState([]);
  const previousYear = moment().subtract(1, "year").format("YYYY-MM-DD");
  const currentYear = moment().add(1, "second").format("YYYY-MM-DD");
  const threeMonthPrior = moment().subtract(3, "months").format("YYYY-MM-DD");
  const first = props.pass[0].split(",")[0];
  const second = props.pass[0].split(",")[1];
  console.log(first, second);
  useEffect(() => {
    fetch(
      `https://api.exchangerate.host/timeseries?start_date=${previousYear}&end_date=${currentYear}&base=${first}&symbols=${second}&places=3`
    )
      .then((res) => res.json(res))
      .then((data) => {
        const date = [];
        for (const [key, value] of Object.entries(data.rates)) {
          for (const [currency, amount] of Object.entries(value)) {
            var innerArr = [key, amount];
            date.push(innerArr);
            setCurrenc(currency);
          }
        }
        setDates(date);
        console.log(date);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [first]);

  const state = {
    series: [
      {
        name: currenc,
        data: dates,
      },
    ],
    options: {
      chart: {
        id: "chart2",
        type: "line",
        height: 230,
        foreColor: "#ccc",
        toolbar: {
          autoSelected: "pan",
          show: true,
        },
      },
      colors: ["#FF0080"],
      stroke: {
        width: 3,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
      },
      title: {
        text: `Exchange Rate Movement (1Y) - ${first} to ${second}`,
        align: "center",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
        labels: {
          format: "yy-MMM-dd",
        },
      },
    },

    seriesLine: [
      {
        name: currenc,
        data: dates,
      },
    ],
    optionsLine: {
      chart: {
        id: "chart1",
        height: 130,
        type: "bar",
        foreColor: "#ccc",
        brush: {
          target: "chart2",
          enabled: true,
        },
        selection: {
          enabled: true,
          fill: {
            color: "#fff",
            opacity: 0.4,
          },
          xaxis: {
            min: new Date(threeMonthPrior).getTime(),
            max: new Date(currentYear).getTime(),
          },
        },
      },
      colors: ["#FF0080"],
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.91,
          opacityTo: 0.1,
        },
      },
      xaxis: {
        type: "datetime",
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        tickAmount: 2,
      },
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "700px",
        backgroundColor: "#1C1C9E",

        borderTop: "2px solid #007aff",
      }}
    >
      {" "}
      <Box sx={{ padding: "50px" }}>
        <Chart
          options={state.options}
          series={state.series}
          type="line"
          height={330}
        />
        <Chart
          options={state.optionsLine}
          series={state.seriesLine}
          type="area"
          height={180}
        />
      </Box>
    </Box>
  );
}
