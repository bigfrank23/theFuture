import React, { useState, useEffect } from "react";
import { Box, Typography, keyframes, Grid, Card, CardActionArea, CardMedia, CardContent, Avatar, CardHeader, Stack, Pagination, CardActions, Skeleton } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import { v4 as uuidv4 } from "uuid";
import RichTextInput from "../../components/richTextInput/RichTextInput";
import UserImg from "../../images/user.png";
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
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/userSlice";
// import authorImg from '../../images/profile4.jpg'
import { red } from "@mui/material/colors";
import { createPost, getPosts } from "../../redux/postsSlice";
import moment from 'moment'

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

const userId = JSON.parse(localStorage.getItem("profile"))?.result?._id;

const Posts = () => {
  const [switchInput, setSwitchInput] = useState(false);
  const [content, setContent] = useState("");
  const [user, setUser] = useState("");
  const [post, setPost] = useState("");

  const postStatus = useSelector((state) => state.posts.status);

  const searchParams = new URLSearchParams(window.location.search);
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const [posts, setPosts] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loadMore, setLoadMore] = useState(false);

  const dispatch = useDispatch();

  // console.log(content)
  const location = useLocation();
  const catName = location.pathname.split("/")[1];
  // console.log(location)

  const history = useHistory()

  // const user = useSelector((state) => state.user.currentUser);

  const handleChange = (value) => {
    setContent(value);
  };

  const handleSubmit = () => {
    console.log(content);
    dispatch(createPost({content, username: user.userName, userImg: user.profilePhoto, setContent}))
  };

  // const handlePageChange = () => {
  //   setCurrentPage(currentPage + 1);
  //   setLoadMore(true);
  // }
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    setLoadMore(true);
    history.push(`?page=${page}`);
  };


  useEffect(() => {
    dispatch(getUser({ userId, setUser }));
    dispatch(getPosts({setLoadMore, setTotalPages, currentPage, setPosts, posts}))
  }, [dispatch, currentPage]);
  
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
        <Box
          component={Link}
          to="/live_page"
          className="posts-links"
          sx={{
            position: "absolute",
            background: "#333",
            color: "#fff",
            padding: "1rem",
            borderTopRightRadius: "50px",
            borderBottomRightRadius: "50px",
            cursor: "pointer",
          }}
        >
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
              style={
                catName === list.name.toLowerCase()
                  ? { color: "#f44336" }
                  : { color: "rgb(100 116 139)" }
              }
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginRight: "10px",
            }}
          >
            <Box
              component="img"
              src={user.profilePhoto || UserImg}
              alt="user"
              sx={{
                width: "40px",
                height: "40px",
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
            {!switchInput ? (
              <Box sx={{ width: "100%" }}>
                <EmojiInput className="animate" user={user} />
              </Box>
            ) : (
              <RichTextInput
                className="animate"
                placeholder="What's on your mind?"
                handleChange={handleChange}
                content={content}
                setContent={setContent}
                handleSubmit={handleSubmit}
                post={post}
                setPost={setPost}
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
            showFirstButton
            showLastButton
            color="primary"
            variant="outlined"
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      </Box>

      {/* Category Posts */}
      <Box component="section" sx={{ padding: "0 24px", marginTop: "5rem" }}>
        {/* <Grid container rowSpacing={4} columnSpacing={{ xs: 6, sm: 4, md: 3 }}> */}
        <Grid container spacing={4}>
          {posts.map((post) => (
            <>
              {postStatus === "loading" ? (
                <Stack spacing={1}>
                  {/* For variant="text", adjust the height via font-size */}
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  {/* For other variants, adjust the size with `width` and `height` */}
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rectangular" width={210} height={60} />
                  <Skeleton variant="rounded" width={210} height={60} />
                </Stack>
              ) : (
                <Grid
                  key={post._id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  sx={{ boxShadow: "5px 5px 5px 3px gainsboro" }}
                  component={Link}
                    to={"/post/" + post._id}
                    className="posts-links"
                >
                  <Card
                    sx={
                      post.photo === null || post.video === null
                        ? { maxWidth: 345, margin: "auto" }
                        : {
                            maxWidth: 345,
                            margin: "auto",
                            display: "flex",
                            flexDirection: "column-reverse",
                            boxShadow: "none !important",
                          }
                    }
                  >
                    <CardActionArea>
                      {post.photo && (
                        <CardMedia
                          component="img"
                          height="140"
                          image={post.photo}
                          alt="green iguana"
                        />
                      )}
                      {post.video && (
                        <CardMedia
                          component="video"
                          controls
                          autoPlay={false}
                          height="140"
                          src={post.video}
                          alt="green iguana"
                        />
                      )}
                      <CardContent>
                        {/* <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={truncateTitle}
                    >
                      Lizard
                    </Typography> */}
                        {/<\/?[a-z][\s\S]*>/i.test(post.content) ? (
                          <div
                            className="post-content"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                          ></div>
                        ) : (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={truncateDesc}
                          >
                            {post.content}
                          </Typography>
                        )}
                      </CardContent>
                    </CardActionArea>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <CardHeader
                        avatar={
                          <Avatar
                            src={post.userImg || ""}
                            sx={{ bgcolor: red[500] }}
                            aria-label={post.title || ""}
                          >
                            {post.username.charAt(0)}
                          </Avatar>
                        }
                        title={post.username}
                        subheader={moment(post?.createdAt).fromNow()}
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
              )}
            </>
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
            showFirstButton
            showLastButton
            color="primary"
            variant="outlined"
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      </Box>
    </>
  );
}

export default Posts