import React, {useState, useEffect} from 'react'
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, IconButton, Typography, keyframes } from '@mui/material'
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import TheatersIcon from '@mui/icons-material/Theaters';
import './emojiInput.css'
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
// import {openWidget} from '../uploadWidget/uploadWidget'
import { motion, AnimatePresence } from "framer-motion";
// import dummyImg from "../../images/unavail.jpg";
import cogoToast from "cogo-toast";
import Close from '@mui/icons-material/Close';
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from '../../redux/postsSlice';

const spin = keyframes`
  100% {
      transform: rotate(360deg);
  }
  `;


const EmojiInput = ({className, user}) => {
    const [showEmoji, setShowEmoji] = useState(false)
    const [imageUrl, setImageUrl] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [content, setContent] = useState("");

    const dispatch = useDispatch();

    const postStatus = useSelector((state) => state.posts.status);

    const openWidget = () => {
      // Replace CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET with your cloud name and upload preset respectively
      window.cloudinary.openUploadWidget(
        {
          cloudName: "freeman20",
          uploadPreset: "posts_gen01",
          sources: ["local", "url", "camera", "facebook", "instagram"],
          cropping: true,
          // croppingAspectRatio: 1,
          multiple: false,
          maxFiles: 1,
          resourceType: "image",
          maxFileSize: 5000000,
          showAdvancedOptions: true,
          croppingShowDimensions: true,
          croppingDefaultSelectionRatio: 0.75,
          styles: {
            palette: {
              window: "#FFFFFF",
              sourceBg: "#FFFFFF",
              windowBorder: "#90A0B3",
              tabIcon: "#000000",
              inactiveTabIcon: "#555a5f",
              menuIcons: "#555a5f",
              link: "#000000",
              action: "#FF620C",
              inProgress: "#0078FF",
              complete: "#20B832",
              error: "#EA2727",
              textDark: "#000000",
              textLight: "#FFFFFF",
            },
            fonts: {
              default: null,
              "'Source Sans Pro', Helvetica, sans-serif": {
                url: "https://fonts.googleapis.com/css?family=Source+Sans+Pro",
                active: true,
              },
            },
          },
        },
        // handleUpload
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log(result.info);
            setImageUrl(result.info.secure_url);
            cogoToast.success("Photo Added!", {
              position: "bottom-right",
            });
          } else {
            console.error(error);
            cogoToast.error(error.status, {
              position: "bottom-right",
            });
          }
        }
      );
    };

    const openVideoWidget = () => {
      window.cloudinary.openUploadWidget({ 
        cloudName: "freeman20",
        uploadPreset: "posts_gen01",
        resourceType: "video",
        sources: ["local", "url", "camera"],
        maxFiles: 1,
        cropping: true,
        croppingAspectRatio: 16/9,
        croppingShowDimensions: true,
        showAdvancedOptions: true,
        croppingValidateDimensions: true,
        multiple: false,
        maxFileSize: 50000000,
        transformations: [
          { width: 640, height: 480, crop: "fill" },
          { videoCodec: "auto", quality: "auto" }
        ],
        styles: {
              palette: {
                window: "#FFFFFF",
                sourceBg: "#FFFFFF",
                windowBorder: "#90A0B3",
                tabIcon: "#000000",
                inactiveTabIcon: "#555a5f",
                menuIcons: "#555a5f",
                link: "#000000",
                action: "#FF620C",
                inProgress: "#0078FF",
                complete: "#20B832",
                error: "#EA2727",
                textDark: "#000000",
                textLight: "#FFFFFF",
              },
              fonts: {
                default: null,
                "'Source Sans Pro', Helvetica, sans-serif": {
                  url: "https://fonts.googleapis.com/css?family=Source+Sans+Pro",
                  active: true,
                },
              },
            },
      },
      // handleUpload
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log(result.info);
            console.log(result.info.original_filename);
            setVideoUrl(result.info.secure_url);
            cogoToast.success("Video Added!", {
              position: "bottom-right",
            });
          } else {
            console.error(error);
            cogoToast.error(error.status, {
              position: "bottom-right",
            });
          }
        }
      );
    }

     const handleFocus = () => {
       setShowPreview(true);
     };

     const handleClose = () => {
       if (imageUrl !== null) {
         setShowPreview(false);
       }
       if (videoUrl !== null) {
         setShowPreview(false);
       }
     };

     useEffect(()=> {
       imageUrl !== null && handleFocus()
       videoUrl !== null && handleFocus()
     }, [])

     const handleSubmit = () => {
      //  console.log(content);
       dispatch(createPost({ content, imageUrl, videoUrl, username: user.userName, userImg: user.profilePhoto, setImageUrl, setVideoUrl, setContent }));
     };

  return (
    <>
      <Box sx={{ position: "relative" }} className={className}>
        <Box
          component="textarea"
          placeholder="What's on your mind?"
          className="inputClass"
          sx={{ width: { xs: "100%", sm: "100%", md: "500px", lg: "500px" } }}
          onChange={(e) => setContent(e.target.value)}
          onFocus={handleFocus}
          value={content}
        />
        <Box>
          <div
            style={{
              position: "absolute",
              zIndex: 1,
              left: "10px",
              top: "100px",
              display: "flex",
              gap: ".5rem",
            }}
          >
            {!showEmoji && 
            <SentimentSatisfiedAltIcon
              sx={{ fill: "#5d8ffc", cursor: "pointer" }}
              onClick={() => setShowEmoji(true)}
            />
            }
            {showEmoji && 
              <CloseIcon
                sx={{ fill: "red", cursor: "pointer" }}
                onClick={() => setShowEmoji(false)}
              />
            }
            <AddPhotoAlternateIcon
              // onClick={() => setShowPicker(!showPicker)}
              onClick={openWidget}
              sx={{ fill: "#5d8ffc", cursor: "pointer" }}
            />
            <TheatersIcon
              // onClick={() => setShowPicker(!showPicker)}
              onClick={openVideoWidget}
              sx={{ fill: "#5d8ffc", cursor: "pointer" }}
            />
          </div>
          {showEmoji && (
            <Box className="animate-emoji">
              <Picker
                data={data}
                onEmojiSelect={(emoji) =>
                  setContent(content + emoji.native)
                }
              />
            </Box>
          )}
        </Box>
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="preview-card"
              key="modal"
              style={{ marginTop: "2rem" }}
            >
              <Card sx={{ maxWidth: "500px" }}>
                <CardContent>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h5" component="div">
                      Preview
                    </Typography>
                    <IconButton
                      onClick={handleClose}
                      // sx={{ position: "relative", float: "right", top: "5px" }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  <CardActionArea>
                    {imageUrl !== null && (
                      <>
                        <CardMedia
                          component="img"
                          height="140"
                          image={imageUrl}
                          alt="green iguana"
                          style={imageUrl !== null ? {display: 'block'} : {display: 'none'}}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            right: "5px",
                            top: "5px",
                            background: "red",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <CloseIcon
                            sx={{ color: "#fff", fontSize: "1rem" }}
                            onClick={() => setImageUrl(null)}
                          />
                        </Box>
                      </>
                    )}

                    {videoUrl !== null && (
                      <>
                        <CardMedia
                          component="video"
                          controls
                          autoPlay={false}
                          // height="240"
                          height="140"
                          src={videoUrl}
                          title="Sample Video"
                          style={videoUrl !== null ? {display: 'block'} : {display: 'none'}}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            right: "5px",
                            top: "5px",
                            background: "red",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <CloseIcon
                            sx={{ color: "#fff", fontSize: "1rem" }}
                            onClick={() => setVideoUrl(null)}
                          />
                        </Box>
                      </>
                    )}
                    <CardContent>
                      {/* <Typography gutterBottom variant="h5" component="div">
                        Lizard
                      </Typography> */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ maxWidth: "500px", overflowWrap: "anywhere" }}
                      >
                        {content}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  {/* <Button variant="contained">Send</Button> */}
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={postStatus === "loading"}
                    startIcon={
                      postStatus === "loading" && (
                        <AutorenewIcon
                          sx={{ animation: `${spin} 1s infinite ease` }}
                        />
                      )
                    }
                  >
                    {postStatus === "loading" ? "" : "Send"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </>
  );
}

export default EmojiInput