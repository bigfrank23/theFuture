import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Divider, Grid, IconButton, Pagination, Stack, Typography } from '@mui/material'
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
// import PlaceIcon from "@mui/icons-material/Place";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import RepeatIcon from "@mui/icons-material/Repeat";
// import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import TelegramIcon from "@mui/icons-material/Telegram";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import InterestsIcon from '@mui/icons-material/Interests';
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import profileImg from '../../images/user.png'
import coverImg from '../../images/sea.jpg'
import { items, photos } from '../../data/profilePageData';
import { red } from '@mui/material/colors';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
import Geocode from 'react-geocode'


import {PhotoAlbum} from "react-photo-album";
import { Link } from 'react-router-dom';
import { getUser } from '../../redux/userSlice';

const truncateTitle = {
  whiteSpace: 'nowrap ', /* prevent the text from wrapping to the next line */
  overflow: 'hidden', /* hide any overflowing text */
  textOverflow: 'ellipsis', /* display an ellipsis (...) to indicate truncated text */
  width: '200px', /* set the width of the element to the desired value */
}

const truncateDesc = {
  display: '-webkit-box',
  WebkitLineClamp: 4, /* specify the number of lines to show */
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}

const userId = JSON.parse(localStorage.getItem("profile"))?.result?._id;

const ProfilePage = () => {
  const [index, setIndex] = useState(-1);
  const [user, setUser] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [address, setAddress] = useState('')

  const dispatch = useDispatch()

  useEffect(()=>{
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})

    dispatch(getUser({userId, setUser}))

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=> {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      }, (err)=> {console.log(err)})
    }else{
      console.log('Geolocation is not supported by this browser')
    }
  },[dispatch])

  useEffect(()=>{
    if(latitude && longitude){
      Geocode.fromLatLng(latitude, longitude).then(
        (response)=> {
          const address = response.results[0].formatted_address;
          setAddress(address)
        }, (error)=> {
          console.error(error)
        }
      )
    }
  },[latitude, longitude])
  
  // console.log(
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setLatitude(position.coords.latitude);
  //     setLongitude(position.coords.longitude);
  //   })
  // );
  console.log(longitude)
  console.log(latitude)
  console.log(address)

  const date = moment(user.dob)
  const formattedDate = date.format('MMM D')

  return (
    <>
      <Box
        sx={{
          padding: { xs: "0px", sm: "0 24px", md: "0 24px", lg: "0 24px" },
          marginTop: "4rem",
        }}
      >
        <Box
          component="section"
          sx={{
            background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${coverImg})`,
            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: {
                xs: "calc(100% - 3rem)",
                sm: "calc(100% - 12rem)",
                md: "45%",
                lg: "40%",
              },
              padding: "3rem",
              textAlign: "center",
              color: "#fff",
              boxShadow: "0 10px 25px 0 rgb(0 0 0 / 30%)",
              filter: "drop-shadow(2px 4px 6px rgb(0 0 0 / 30%))",
            }}
          >
            <Box
              component={Link}
              to="/profile_update"
              className="posts-links"
              sx={{
                background: "rgba(0,0,0,0.6)",
                padding: "4px",
                borderRadius: "5px",
                cursor: "pointer",
                float: "right",
              }}
            >
              <Typography variant="body1" sx={{ color: "#fff" }}>
                Edit
              </Typography>
            </Box>
            <Box
              component="img"
              src={user?.profilePhoto || profileImg}
              sx={{
                width: "123px",
                height: "123px",
                borderRadius: "50%",
                boxShadow: "0 10px 25px 0 rgb(0 0 0 / 30%)",
                border: "1px solid #fff",
              }}
              loading="lazy"
            />
            <Box
              sx={{ display: "flex", gap: "1rem", justifyContent: "center" }}
            >
              <Typography
                component="h3"
                variant="h5"
                sx={{ fontWeight: 700, marginTop: "1rem" }}
              >
                {" "}
                {user?.firstName}
                &nbsp; {user?.lastName}
              </Typography>
              <VerifiedIcon sx={{ fontSize: "1rem" }} />
            </Box>
            <Typography
              component="span"
              variant="caption"
              sx={{ color: "hsla(0,0%,100%,.8)", my: 2 }}
            >
              @{user.userName}
            </Typography>
            <Typography
              component="h3"
              variant="h6"
              sx={{ color: "hsla(0,0%,100%,.8)", my: 2 }}
            >
              {user.jobTitle}
            </Typography>
            <Typography
              component="p"
              variant="subtitle2"
              sx={{ color: "hsla(0,0%,100%,.8)", my: 2 }}
            >
              {user.bio}
            </Typography>
            <Box
              sx={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}
            >
              <div>
                <span>1k</span>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ fontWeight: 300 }}
                >
                  Following
                </Typography>
              </div>
              <div>
                <span>5k</span>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ fontWeight: 300 }}
                >
                  Followers
                </Typography>
              </div>
              <div>
                <span>100</span>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ fontWeight: 300 }}
                >
                  Posts
                </Typography>
              </div>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: ".3rem",
                  color: "#ccc",
                  margin: "1rem 0",
                }}
              >
                <CalendarMonthIcon
                  sx={{ fontSize: "1rem", alignSelf: "center" }}
                />
                <Typography component="span" variant="caption">
                  {formattedDate}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: ".3rem",
                  color: "#ccc",
                  margin: "1rem 0",
                }}
              >
                <PlaceOutlinedIcon
                  sx={{ fontSize: "1rem", alignSelf: "center" }}
                />
                <Typography component="span" variant="caption">
                  Lagos
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: ".3rem",
                  color: "#ccc",
                  margin: "1rem 0",
                }}
              >
                <Box
                  sx={{
                    width: "13px",
                    height: "13px",
                    borderRadius: "20px",
                    background: "lime",
                    alignSelf: "center",
                  }}
                />
                <Typography component="span" variant="caption">
                  online
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                color: "#ccc",
                marginBottom: "1rem",
              }}
            >
              <InterestsIcon sx={{ fontSize: "1rem", alignSelf: "center" }} />
              {/* {user?.interest?.map((v,i)=> (
                ))} */}
              <Typography
                component="span"
                variant="caption"
                sx={{ textAlign: "center" }}
              >
                {user?.interests?.join(", ")}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", gap: "1rem", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{ borderRadius: "10px" }}
              >
                follow
              </Button>
              <IconButton
                size="small"
                sx={{
                  background: "#888",
                  "&:hover": { background: "#9b9b9b" },
                }}
              >
                <MailOutlinedIcon sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  background: "#e91e63",
                  "&:hover": { background: "#b94069" },
                }}
              >
                <BookmarksIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* All Activities and Media Section */}
      <Box component="section" sx={{ padding: "0 24px", marginTop: "5rem" }}>
        <Box
          sx={{
            display: { xs: "block", sm: "block", md: "flex", lg: "flex" },
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ flex: 2 }}>
            <Box
              sx={{
                display: "flex",
                gap: ".5rem",
                color: "#333",
                justifyContent: {
                  xs: "center",
                  sm: "flex-start",
                  md: "flex-start",
                  lg: "flex-start",
                },
              }}
            >
              <ArticleOutlinedIcon sx={{ alignSelf: "center" }} />
              <Typography
                component="h3"
                variant="h6"
                sx={{ fontWeight: 600, textAlign: "center" }}
              >
                Activities
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Grid container spacing={2}>
              {items.map((item) => (
                <Grid key={item.id} item xs={12} sm={6} md={6} lg={6}>
                  {item.liked && (
                    <Box
                      sx={{
                        display: "flex",
                        gap: ".5rem",
                        my: 1,
                        justifyContent: "center",
                      }}
                    >
                      <ThumbUpIcon
                        color="primary"
                        sx={{ fontSize: ".75rem" }}
                      />
                      <Typography
                        component="p"
                        variant="caption"
                        color="rgba(0, 0, 0, 0.6)"
                      >
                        {item.liked}
                      </Typography>
                    </Box>
                  )}
                  {item.repost && (
                    <Box
                      sx={{
                        display: "flex",
                        gap: ".5rem",
                        my: 1,
                        justifyContent: "center",
                      }}
                    >
                      <RepeatIcon color="primary" sx={{ fontSize: ".75rem" }} />
                      <Typography
                        component="p"
                        variant="caption"
                        color="rgba(0, 0, 0, 0.6)"
                      >
                        {item.repost}
                      </Typography>
                    </Box>
                  )}
                  {item.post && (
                    <Box
                      sx={{
                        display: "flex",
                        gap: ".5rem",
                        my: 1,
                        justifyContent: "center",
                      }}
                    >
                      <TelegramIcon
                        color="primary"
                        sx={{ fontSize: ".75rem" }}
                      />
                      <Typography
                        component="p"
                        variant="caption"
                        color="rgba(0, 0, 0, 0.6)"
                      >
                        {item.post}
                      </Typography>
                    </Box>
                  )}
                  <Card sx={{ maxWidth: 345, margin: "auto" }} key={item.id}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.img}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={truncateTitle}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={truncateDesc}
                        >
                          {item.desc}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
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
                        title={item.author}
                        subheader={item.date}
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
            {/* Pagination for activities section */}
            <Box
              component="div"
              sx={{
                marginTop: "3rem",
                display: "flex",
                justifyContent: {
                  xs: "center",
                  sm: "flex-start",
                  md: "flex-start",
                  lg: "flex-start",
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
          <Box
            sx={{
              flex: 1,
              marginTop: { xs: "5rem", sm: "5rem", md: "unset", lg: "unset" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: ".5rem",
                color: "#333",
                justifyContent: {
                  xs: "center",
                  sm: "flex-start",
                  md: "flex-start",
                  lg: "flex-start",
                },
              }}
            >
              <PermMediaOutlinedIcon sx={{ alignSelf: "center" }} />
              <Typography
                component="h3"
                variant="h6"
                sx={{ fontWeight: 600, textAlign: "center" }}
              >
                Media
              </Typography>
            </Box>
            <Divider sx={{ my: 1, mb: 2 }} />
            <Card>
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
                  lg: "flex-start",
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
        </Box>
      </Box>
    </>
  );
}

export default ProfilePage