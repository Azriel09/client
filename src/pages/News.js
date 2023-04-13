import React, { useState, useEffect } from "react";
import { NewscardLeft, NewscardRight } from "../components/newscard";
import Footer from "../components/footer";
import { Box, Typography, useTheme } from "@mui/material";

export default function News() {
  const theme = useTheme();

  const [news1, setNews1] = useState([]);
  const [news2, setNews2] = useState([]);
  const [news3, setNews3] = useState([]);

  useEffect(() => {
    // fetch("/api/news")
    fetch("/api/news")
      .then((res) => res.json(res))
      .then((data) => {
        setNews1(data.data1);
        setNews2(data.data2);
        setNews3(data.data3);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="news-page">
      <Box
        sx={{
          width: "100%",
          maxHeight: "400vh",
          display: "flex",
          flexDirection: "row",
          marginTop: "10vh",
          marginBottom: "5vh",
          [theme.breakpoints.down("910")]: {
            flexDirection: "column",
          },
        }}
      >
        {/* TOP NEWS */}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            marginLeft: "20px",
            [theme.breakpoints.down("910")]: {
              width: "100%",
            },
          }}
        >
          <Typography
            sx={{ fontSize: "2em", fontWeight: "600", marginBottom: "10px" }}
          >
            Top Stories
          </Typography>
          {/* TOP LEFT */}

          {news1 &&
            news1.map((article) => {
              return (
                <NewscardLeft
                  key={article.uuid}
                  title={article.title}
                  image={article.image_url}
                  link={article.url}
                  description={article.description}
                />
              );
            })}
        </Box>
        {/* MINOR NEWS */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            height: "100%",
            marginTop: "5vh",
            [theme.breakpoints.down("910")]: {
              width: "100%",
            },
          }}
        >
          {/* MINOR NEWS PART 1 */}
          <Box>
            {news2 &&
              news2.map((article) => {
                return (
                  <NewscardRight
                    key={article.uuid}
                    title={article.title}
                    image={article.image_url}
                    link={article.url}
                    description={article.description}
                  />
                );
              })}
          </Box>
          {/* MINOR NEWS PART 2 */}
          <Box>
            {news3 &&
              news3.map((article) => {
                return (
                  <NewscardRight
                    key={article.uuid}
                    title={article.title}
                    image={article.image_url}
                    link={article.url}
                    description={article.description}
                  />
                );
              })}
          </Box>
        </Box>
      </Box>
      <Footer />
    </div>
  );
}
