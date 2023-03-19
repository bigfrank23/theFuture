import React, { useState } from "react";
import { Box, Typography, keyframes, Grid, Card, CardActionArea, CardMedia, CardContent, Avatar, CardHeader, Stack, Pagination, CardActions } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import { v4 as uuidv4 } from "uuid";
import RichTextInput from "../../components/richTextInput/RichTextInput";
import UserImg from "../../images/user2.jpg";
import { Link, useHistory, useLocation } from "react-router-dom";
import EmojiInput from "../../components/richTextInput/EmojiInput";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import SwitchRightIcon from "@mui/icons-material/SwitchRight";
import RepeatIcon from "@mui/icons-material/Repeat";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MovieIcon from "@mui/icons-material/Movie";
import FlightIcon from "@mui/icons-material/Flight";
import BusinessIcon from "@mui/icons-material/Business";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import './posts.css'
import dummyImg from '../../images/unavail.jpg'
// import authorImg from '../../images/profile4.jpg'
import { red } from "@mui/material/colors";

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
    `;

const truncateTitle = {
  whiteSpace:
    "nowrap " /* prevent the text from wrapping to the next line */,
  overflow: "hidden" /* hide any overflowing text */,
  textOverflow:
    "ellipsis" /* display an ellipsis (...) to indicate truncated text */,
  width: "200px" /* set the width of the element to the desired value */,
};

const truncateDesc = {
  display: "-webkit-box",
  WebkitLineClamp: 4 /* specify the number of lines to show */,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const categoryLinkStyles = {
  className:
    "text-gray-600 block px-2 py-1 hover:underline hover:text-slate-100",
  activeClassName: "underline text-gray-900",
};

const categoryLinkList = [
  {
    name: "General",
    to: "/general",
    className: categoryLinkStyles.className,
    id: uuidv4(),
  },
  {
    name: "Sport",
    to: "/sport",
    className: categoryLinkStyles.className,
    id: uuidv4(),
  },
  {
    name: "Music",
    to: "/music",
    className: categoryLinkStyles.className,
    id: uuidv4(),
  },
  {
    name: "Travels",
    to: "/travels",
    className: categoryLinkStyles.className,
    id: uuidv4(),
  },
  {
    name: "Business",
    to: "/business",
    className: categoryLinkStyles.className,
    id: uuidv4(),
  },
  {
    name: "Movies",
    to: "/movies",
    className: categoryLinkStyles.className,
    id: uuidv4(),
  }
];

const items = [1, 2, 3, 4, 5, 6, 7, 8]


const Posts = ({placeholder, className}) => {
  const [switchInput, setSwitchInput] = useState(false)
  
  
  const location = useLocation();
  const catName = location.pathname.split("/")[1];
  // console.log(location)


  return (
    <>
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
        <Box component={Link} to='/live_page' className="posts-links" sx={{position: 'absolute',background: '#333', color: '#fff', padding: '1rem', borderTopRightRadius:'50px', borderBottomRightRadius:'50px', cursor: 'pointer'}}>
        Go Live
        </Box>
        <Box sx={{ display: "flex", gap: ".5rem", justifyContent: "center" }}>
          {catName === "sport" && (
            <SportsSoccerIcon
              sx={{ color: "#0071e5", animation: `${spin} 10s infinite ease` }}
            />
          )}
          {catName === "music" && (
            <MusicNoteIcon
              sx={{ color: "#0071e5", animation: `${spin} 10s infinite ease` }}
            />
          )}
          {catName === "movies" && (
            <MovieIcon
              sx={{ color: "#0071e5", animation: `${spin} 10s infinite ease` }}
            />
          )}
          {catName === "travels" && (
            <FlightIcon
              sx={{ color: "#0071e5", animation: `${spin} 10s infinite ease` }}
            />
          )}
          {catName === "business" && (
            <BusinessIcon
              sx={{ color: "#0071e5", animation: `${spin} 10s infinite ease` }}
            />
          )}
          {catName === "general" && (
            <AltRouteIcon
              sx={{ color: "#0071e5", animation: `${spin} 10s infinite ease` }}
            />
          )}
          <Typography textTransform="capitalize">{catName}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            justifyContent: {
              xs: "flex-start",
              sm: "center",
              md: "center",
              lg: "center",
            },
            fontSize: "0.875rem",
            marginTop: "1rem",
            overflow: "auto",
          }}
        >
          {categoryLinkList.map((list) => (
            <Link
              to={list.to}
              key={list.id}
              style={catName === list.name.toLowerCase() ? {color: '#f44336'} : { color: "rgb(100 116 139)" }}
              className="catLinks"
            >
              {list.name}
            </Link>
          ))}
        </Box>
      </Box>

      {/* Post Input Section */}
      <Box component="section" sx={{ padding: "0 24px" }}>
        <Box
          sx={{
            display: { xs: "block", sm: "block", md: "flex", lg: "flex" },
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              component="img"
              src={UserImg}
              alt="user"
              sx={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                alignSelf: "center",
              }}
            />
            {switchInput ? (
              <SwitchLeftIcon
                sx={{ alignSelf: "center", cursor: "pointer" }}
                onClick={() => setSwitchInput(false)}
              />
            ) : (
              <SwitchRightIcon
                sx={{ alignSelf: "center", cursor: "pointer" }}
                onClick={() => setSwitchInput(true)}
              />
            )}
          </Box>
          <Box
            sx={{
              width: { xs: "100%", sm: "70%", md: "auto", lg: "auto" },
              // width: 'auto',
              margin: { sm: "auto", md: 0, lg: 0 },
            }}
          >
            {switchInput ? (
              <Box sx={{width:'100%'}}>

                <EmojiInput className="animate" />
              </Box>
            ) : (
              <RichTextInput
                className="animate"
                placeholder="What's on your mind?"
              />
            )}
          </Box>
        </Box>
      </Box>

      {/* Pagination 1 */}
      <Box
        component="section"
        sx={{
          padding: "0 24px",
          marginTop: "5rem",
          display: "flex",
          justifyContent: "center",
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

      {/* Category Posts */}
      <Box component="section" sx={{ padding: "0 24px", marginTop: "5rem" }}>
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{ maxWidth: 345, margin: "auto" }}
                component={Link}
                to="/post"
                className="posts-links"
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={dummyImg}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={truncateTitle}
                    >
                      Lizard
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={truncateDesc}
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        src={item.profileImg}
                        sx={{ bgcolor: red[500] }}
                        aria-label={item.title}
                      >
                        R
                      </Avatar>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                  />
                  <CardActions
                    sx={{ fontSize: ".8rem", color: "rgba(0, 0, 0, 0.6)" }}
                  >
                    <Box>
                      <ThumbUpIcon sx={{ fontSize: ".875rem" }} />
                      <span>4k</span>
                    </Box>
                    <Box>
                      <ModeCommentIcon sx={{ fontSize: ".875rem" }} />
                      <span>4k</span>
                    </Box>
                    <Box>
                      <RepeatIcon sx={{ fontSize: ".875rem" }} />
                      <span>4k</span>
                    </Box>
                    <Box>
                      <VisibilityIcon sx={{ fontSize: ".875rem" }} />
                      <span>4k</span>
                    </Box>
                  </CardActions>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Pagination 2 */}
      <Box
        component="section"
        sx={{
          padding: "0 24px",
          marginTop: "5rem",
          display: "flex",
          justifyContent: "center",
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
    </>
  );
}

export default Posts