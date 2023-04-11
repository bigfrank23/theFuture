import React, {useState, useEffect} from 'react'
import { Box, Divider, keyframes, Typography } from '@mui/material'
import { v4 as uuidv4 } from "uuid";
import ShowCatLink from '../../../components/showCatLink/ShowCatLink';
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import authorImg from '../../../images/user2.jpg'
import RepeatIcon from "@mui/icons-material/Repeat";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import dummyImg from '../../../images/unavail.jpg'
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailIcon from "@mui/icons-material/Mail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import RedditIcon from "@mui/icons-material/Reddit";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { EmailShareButton, FacebookShareButton, LinkedinShareButton,  PinterestShareButton,RedditShareButton, TelegramShareButton,  TwitterShareButton, WhatsappShareButton, } from "react-share";
import { Link, useParams } from 'react-router-dom';
import moment from "moment";
import './post.css'
import DrawerModal from '../../../components/modal/Modal'
import VerifiedIcon from "@mui/icons-material/Verified";

import {useDispatch} from 'react-redux'
import {getPost} from '../../../redux/postsSlice'

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
    name: "Sports",
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
];

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
    `;

const Post = () => {
  const [showCatLink, setShowCatLink] = useState(false)
  const [scroll, setScroll] = useState(false)
  const [post, setPost] = useState([])
  const [isOpen, setIsOpen] = useState(false);

  

  const {id} = useParams()

  const dispatch = useDispatch()
  

  const handleShowCatLink = () => {
    setShowCatLink(!showCatLink)
  }

   const handleOpen = () => {
     setIsOpen(true);
   };

   const handleClose = () => {
     setIsOpen(false);
   };

  useEffect(()=>{
    setScroll(true)
    dispatch(getPost({postId:id, setPost}))
        
  }, [])

  window.addEventListener("scroll", () => {
    if (window.scrollY <= 10) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  });


  return (
    <>
      {scroll && (
        <ShowCatLink onClick={handleShowCatLink} showCatLink={showCatLink} />
      )}
      {showCatLink && (
        <Box component="section" sx={{ display: "flex", justifyContent: "center", flexDirection: "column", padding: "2rem 24px", marginTop: "4rem", }} >
          <Box sx={{ display: "flex", gap: ".5rem", justifyContent: "center" }}>
            <CategoryIcon
              sx={{ color: "#0071e5", animation: `${spin} 10s infinite ease` }}
            />
            <Typography>Pick Category</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "1rem", justifyContent: { xs: "flex-start", sm: "center", md: "center", lg: "center", }, fontSize: "0.875rem", marginTop: "1rem", overflow: "auto", }} >
            {categoryLinkList.map((list) => (
              <Link
                to={list.to}
                key={list.id}
                style={{ color: "rgb(100 116 139)" }}
                className="catLinks"
              >
                {list.name}
              </Link>
            ))}
          </Box>
        </Box>
      )}

      {/* Post title, author, date and time section */}
      <Box
        component="section"
        sx={{
          padding: "0 24px",
          marginTop: showCatLink ? 0 : "6rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography component="h3" variant="h4" sx={{ textAlign: "center", fontSize: {xs: '1.3rem', sm: '2.125rem', md: '2.125rem', lg: '2.125rem'} }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias
            praesentium minima vero maxime est nemo?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ textAlign: "center" }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {(
                  <Box
                    component="img"
                    src={post.userImg}
                    sx={{ width: "50px", height: "50px", borderRadius: "50%" }}
                    className='post-user-img'
                  />
                ) || <PersonIcon />}
              </Box>
              <Typography color="#777">{post.username}</Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: ".6rem",
                  color: "rgba(0, 0, 0, 0.6)",
                }}
              >
                <Box sx={{ display: "flex", gap: ".3rem" }}>
                  <CalendarMonthIcon
                    sx={{ fontSize: ".9rem", alignSelf: "center" }}
                  />
                  <Typography sx={{ fontSize: ".9rem" }}>{moment(post.createdAt).format('MMM D, YY')}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: ".3rem" }}>
                  <AccessTimeIcon
                    sx={{ fontSize: ".9rem", alignSelf: "center" }}
                  />
                  <Typography sx={{ fontSize: ".9rem" }}>{moment(post.createdAt).format('h:mma')}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Post Imgae section*/}
      <Box sx={{ padding: "0 24px", margin: "1rem 0rem" }}>
        {post.photo && (
          <Box
            component="img"
            src={post.photo}
            alt=""
            sx={{ width: "100%", height: {xs: '200px', sm: '400px', md: '400px', lg: '400px'}, objectFit: "cover" }}
          />
          )}
        {post.video && (
          <Box
            component="video"
            src={post.video}
            control
            autoplay='false'
            sx={{ width: "100%", height: {xs: '200px', sm: '400px', md: '400px', lg: '400px'}, objectFit: "cover" }}
          />
          )}
        </Box>

      {/* Post Description section */}
      <Box
        component="section"
        sx={{ display: {xs: 'block', sm: 'flex', md: 'flex', lg: 'flex'}, gap: "2rem", padding: "0 24px" }}
      >
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              gap: ".3rem",
              justifyContent: "center",
            }}
          >
            <Typography
              component="h5"
              variant="h6"
              sx={{ textAlign: "center", fontWeight: 600 }}
            >
              Share on
            </Typography>
            <ShareIcon sx={{ alignSelf: "center" }} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: {xs: 'unset', sm: 'column',md:'column', lg: 'column'}, justifyContent: 'center', my:{xs:1,sm:0,md:0,lg:0} }}>
            <FacebookShareButton
              url={"https://www.example.com"}
              quote={"Check out this great post!"}
              hashtag={"#example"}
              style={{ color: "#1877f2" }}
            >
              <FacebookIcon />
            </FacebookShareButton>
            <TwitterShareButton
              url={"https://www.example.com"}
              quote={"Check out this great post!"}
              hashtag={"#example"}
              style={{ color: "#1da1f2" }}
            >
              <TwitterIcon />
            </TwitterShareButton>
            <LinkedinShareButton
              url={"https://www.example.com"}
              quote={"Check out this great post!"}
              hashtag={"#example"}
              style={{ color: "#0a66c2" }}
            >
              <LinkedInIcon />
            </LinkedinShareButton>
            <WhatsappShareButton
              url={"https://www.example.com"}
              quote={"Check out this great post!"}
              hashtag={"#example"}
              style={{ color: "#25d366" }}
            >
              <WhatsAppIcon />
            </WhatsappShareButton>
            <EmailShareButton
              url={"https://www.example.com"}
              quote={"Check out this great post!"}
              hashtag={"#example"}
              style={{ color: " #db4a39" }}
            >
              <MailIcon />
            </EmailShareButton>
            <PinterestShareButton
              url={"https://www.example.com"}
              quote={"Check out this great post!"}
              hashtag={"#example"}
              style={{ color: "#bd081c" }}
            >
              <PinterestIcon />
            </PinterestShareButton>
            <RedditShareButton
              url={"https://www.example.com"}
              quote={"Check out this great post!"}
              hashtag={"#example"}
              style={{ color: "#ff4500" }}
            >
              <RedditIcon />
            </RedditShareButton>
            <TelegramShareButton
              url={"https://www.example.com"}
              quote={"Check out this great post!"}
              hashtag={"#example"}
              style={{ color: "#0088cc" }}
            >
              <TelegramIcon />
            </TelegramShareButton>
          </Box>
        </Box>
        <Box sx={{ flex: "4" }}>
          <Box sx={{display: 'flex', gap:'1rem', justifyContent: 'center'}}>
            <Typography component='span' variant='caption' color='darkslategray' fontSize='.85rem'>180k Likes</Typography>
            <Typography component='span' variant='caption' color='darkslategray' fontSize='.85rem'>400 Reposts</Typography>
            <Typography component='span' variant='caption' color='darkslategray' fontSize='.85rem'>50 Comments</Typography>
          </Box>
          <Divider sx={{margin: '7px 0'}}/>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Box sx={{ display: "flex", color: "#777" }}>
              <ThumbUpIcon sx={{ fontSize: "1rem", alignSelf: "center", cursor: 'pointer' }} onClick={handleOpen}/>
            </Box>
            <Box sx={{ display: "flex", color: "#777" }}>
              <ModeCommentIcon sx={{ fontSize: "1rem", alignSelf: "center", cursor: 'pointer' }} />
            </Box>
            <Box sx={{ display: "flex", color: "#777" }}>
              <RepeatIcon sx={{ fontSize: "1rem", alignSelf: "center", cursor: 'pointer' }} />
            </Box>
            <Box sx={{ display: "flex", color: "#777" }}>
              <BookmarkIcon sx={{ fontSize: "1rem", alignSelf: "center", cursor: 'pointer' }} />
            </Box>
            <Box sx={{ display: "flex", color: "#777" }}>
              <VisibilityIcon sx={{ fontSize: "1rem", alignSelf: "center" }} />
              <span>4k</span>
            </Box>
          </Box>
          <Divider sx={{margin: '7px 0'}}/>
          <Box sx={{marginTop: 'calc(1rem + 7px)'}}>
            {/<\/?[a-z][\s\S]*>/i.test(post.content) ? (
                <div
                  className="post-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
              ) : (
                <Typography component='p' sx={{textAlign: {xs:'justify',sm:'left',md:'left',lg:'left'}}}>
                  {post.content}
                </Typography>
              )}
          </Box>
          <Divider sx={{margin: '7px 0'}}/>
          <Box>
            <Box sx={{display: 'flex', gap:'1rem'}}>
              <Box component='img' src={authorImg} sx={{width: '40px', height: '40px', borderRadius:'50%'}} />
              <Box>
                <Box sx={{display:'flex', gap:'5px'}}>
                  <Typography>Jude</Typography>
                  <VerifiedIcon sx={{fontSize:'1rem', alignSelf:'center'}}/>
                  <Typography component='span' variant='caption' color='#646262' alignSelf='center'>@jude422</Typography>
                  <Typography>1h</Typography>
                </Box>
                <Box>
                  <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit facilis officia voluptas, saepe perspiciatis dolorum!</Typography>
                  <Box component='img' src={dummyImg} sx={{width: '100%', height: 'auto'}} />
                </Box>
                <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              gap: "1rem",
            }}
          >
            <Box sx={{ display: "flex", color: "#777" }}>
              <ThumbUpIcon sx={{ fontSize: "1rem", alignSelf: "center", cursor: 'pointer' }} onClick={handleOpen}/>
            </Box>
            <Box sx={{ display: "flex", color: "#777" }}>
              <ModeCommentIcon sx={{ fontSize: "1rem", alignSelf: "center", cursor: 'pointer' }} />
            </Box>
            <Box sx={{ display: "flex", color: "#777" }}>
              <RepeatIcon sx={{ fontSize: "1rem", alignSelf: "center", cursor: 'pointer' }} />
            </Box>
            <Box sx={{ display: "flex", color: "#777" }}>
              <VisibilityIcon sx={{ fontSize: "1rem", alignSelf: "center" }} />
              <span>4k</span>
            </Box>
          </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <DrawerModal isOpen={isOpen} onClose={handleClose} />
      </Box>
    </>
  );
}

export default Post