import React, { useState, useEffect } from "react";
import { Box, Card, Divider, keyframes, Pagination, Stack, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import ShowCatLink from "../../components/showCatLink/ShowCatLink";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link, useLocation } from "react-router-dom";
import { items, photos } from "../../data/profilePageData";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { PhotoAlbum } from "react-photo-album";

const galleryList = [
  {
    id: uuidv4(),
    link: "/jan_gallery",
    linkName: "January",
  },
  {
    id: uuidv4(),
    link: "/feb_gallery",
    linkName: "February",
  },
  {
    id: uuidv4(),
    link: "/mar_gallery",
    linkName: "March",
  },
  {
    id: uuidv4(),
    link: "/apr_gallery",
    linkName: "April",
  },
  {
    id: uuidv4(),
    link: "/may_gallery",
    linkName: "May",
  },
  {
    id: uuidv4(),
    link: "/jun_gallery",
    linkName: "June",
  },
  {
    id: uuidv4(),
    link: "/jul_gallery",
    linkName: "July",
  },
  {
    id: uuidv4(),
    link: "/aug_gallery",
    linkName: "August",
  },
  {
    id: uuidv4(),
    link: "/sep_gallery",
    linkName: "September",
  },
  {
    id: uuidv4(),
    link: "/oct_gallery",
    linkName: "October",
  },
  {
    id: uuidv4(),
    link: "/nov_gallery",
    linkName: "November",
  },
  {
    id: uuidv4(),
    link: "/dec_gallery",
    linkName: "December",
  },
];

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
    `;

const Gallery = () => {
  const [showCatLink, setShowCatLink] = useState(false);
  const [index, setIndex] = useState(-1);
  const [scroll, setScroll] = useState(false);

  const handleShowCatLink = () => {
    setShowCatLink(!showCatLink);
  };

  useEffect(() => {
    setScroll(true);
  }, []);
  window.addEventListener("scroll", () => {
    if (window.scrollY <= 10) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  });

  const location = useLocation();
  const month = location.pathname.split("/")[1];
  const monthName = month.slice(0, 3)

  return (
    <>
      {scroll && (
        <ShowCatLink onClick={handleShowCatLink} showCatLink={showCatLink} />
      )}
      {showCatLink && (
        <Box
          component="section"
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: "2rem 24px",
            marginTop: "4rem",
          }}
        >
          <Box sx={{ display: "flex", gap: ".5rem", justifyContent: "center" }}>
            <PermMediaOutlinedIcon
              sx={{ color: "#0071e5", animation: `${spin} 10s infinite ease` }}
            />
            {/* <Typography>Jan's</Typography> */}
            <Typography>Gallery</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "1rem", justifyContent: { xs: "flex-start", sm: "center", md: "center", lg: "center", }, fontSize: "0.875rem", marginTop: "1rem", overflow: "auto", }} >
            {galleryList.map((list) => (
              <Link
                to={list.link}
                key={list.id}
                style={monthName === list.linkName.toLocaleLowerCase().slice(0,3) ? {color: '#f44336'} : { color: "rgb(100 116 139)" }}
                className="catLinks"
              >
                {list.linkName}
              </Link>
            ))}
          </Box>
        </Box>
      )}

      <Box
        sx={
          !showCatLink
            ? {
                marginTop: 0,
                padding: "8rem 24px 2rem",
              }
            : {
                marginTop: 0,
                padding: "2rem 24px",
              }
        }
      >
        <Box
          sx={{
            display: "flex",
            gap: ".5rem",
            color: "#333",
            justifyContent: "center",
          }}
        >
          <CalendarMonthIcon sx={{ alignSelf: "center" }} />
          <Typography
            component="h3"
            variant="h6"
            sx={{ fontWeight: 600, textAlign: "center", textTransform: 'capitalize' }}
          >
            {monthName}'s Gallery
          </Typography>
        </Box>
        <Divider sx={{ my: 1, mb: 2 }} />
        <Card sx={{ padding: "2rem" }}>
          <PhotoAlbum
            layout="rows"
            photos={photos}
            targetRowHeight={150}
            onClick={({ index }) => setIndex(index)}
          />

          <Lightbox
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            slides={photos}
          />
        </Card>

        {/* Pagination for media section */}
        <Box
          component="div"
          sx={{
            marginTop: "3rem",
            display: "flex",
            justifyContent: {
              xs: "center",
              sm: "flex-start",
              md: "flex-start",
              lg: "center",
            },
          }}
        >
          <Stack spacing={2}>
            <Pagination
              count={10}
              showFirstButton
              showLastButton
              color="primary"
              variant="outlined"
            />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Gallery