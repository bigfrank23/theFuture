import React, {useRef, useEffect, useState} from 'react'
import { Box, Button, Card, CardContent, CardMedia, keyframes, Typography } from '@mui/material';
import CategoryIcon from "@mui/icons-material/Category";
import {Link} from 'react-router-dom'
import { v4 as uuidv4 } from "uuid";
import image1 from '../../images/sea.jpg'
import image2 from '../../images/mount.jpg'
import image3 from '../../images/house.jpg'
import userImg from '../../images/user.png'
import './heroSection.css'


 const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
    `;

//  const smooth = keyframes`
//     from {
//         transition: 1s ease;
//       }
//       to {
//       transition: 1s ease;
//     }
//     `;



const HerosSection = () => {
    const categoryLinkStyles = {
      className:
        "text-gray-600 block px-2 py-1 hover:underline hover:text-slate-100",
      activeClassName: "underline text-gray-900",
    };

    const categoryLinkList = [
      {
          name: 'General',
          to: '/general',
          className: categoryLinkStyles.className,
          id: uuidv4()
      },
      {
          name: 'Sports',
          to: '/sport',
          className: categoryLinkStyles.className,
          id: uuidv4()
      },
      {
          name: 'Music',
          to: '/music',
          className: categoryLinkStyles.className,
          id: uuidv4()
      },
      {
          name: 'Movies',
          to: '/movies',
          className: categoryLinkStyles.className,
          id: uuidv4()
      },
      {
          name: 'Travels',
          to: '/travels',
          className: categoryLinkStyles.className,
          id: uuidv4()
      },
      {
          name: 'Business',
          to: '/business',
          className: categoryLinkStyles.className,
          id: uuidv4()
      },
    ];

    var slideImg = useRef()
    var images = [
      {
        image: image1,
        text: {
            title: "Title of a longer featured blog post",
            desc: "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
            link: '/#',
            linkName: 'Continue reading...'
        }
      },
      {
        image: image2,
        text: {
            title: "Title of Slide 2",
            desc: "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
            link: '/#',
            linkName: 'Continue reading...'
        }
      },
      {
        image: image3,
        text: {
            title: "Title of Slide 3",
            desc: "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
            link: '/#',
            linkName: 'Continue reading...'
        }
      },
    ];

    const galleryList = [
      {
        id: uuidv4(),
        link: '/jan_gallery',
        linkName: 'January',
      },
      {
        id: uuidv4(),
        link: '/feb_gallery',
        linkName: 'February',
      },
      {
        id: uuidv4(),
        link: '/mar_gallery',
        linkName: 'March',
      },
      {
        id: uuidv4(),
        link: '/apr_gallery',
        linkName: 'April',
      },
      {
        id: uuidv4(),
        link: '/may_gallery',
        linkName: 'May',
      },
      {
        id: uuidv4(),
        link: '/jun_gallery',
        linkName: 'June',
      },
      {
        id: uuidv4(),
        link: '/jul_gallery',
        linkName: 'July',
      },
      {
        id: uuidv4(),
        link: '/aug_gallery',
        linkName: 'August',
      },
      {
        id: uuidv4(),
        link: '/sep_gallery',
        linkName: 'September',
      },
      {
        id: uuidv4(),
        link: '/oct_gallery',
        linkName: 'October',
      },
      {
        id: uuidv4(),
        link: '/nov_gallery',
        linkName: 'November',
      },
      {
        id: uuidv4(),
        link: '/dec_gallery',
        linkName: 'December',
      },
    ]
    var len = images.length
    var i = 0

    const [text, setText] = useState(images[0].text);


    const slider = () => {
      if (i > len - 1) {
        i = 0;
      }
      //  console.log(`Sliding to image ${i + 1}: ${images[i].image}`);
      slideImg.current.src = images[i].image;
      setText(images[i].text);
      // console.log(images[i].text);
      i++;
      setTimeout(slider, 10000);
    }
    useEffect(() => {
      slider();
      // return () => clearTimeout(slider);
    }, []);

    const items = [1,2,3,4,5,6,7,8]

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
        <Box sx={{ display: "flex", gap: ".5rem", justifyContent: "center" }}>
          <CategoryIcon
            sx={{ color: "#0071e5", animation: `${spin} 10s infinite ease` }}
          />
          <Typography>Category</Typography>
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
              style={{ color: "rgb(100 116 139)" }}
              className="catLinks"
            >
              {list.name}
            </Link>
          ))}
        </Box>
      </Box>
      <Box component="section" sx={{ position: "relative", padding: "0 24px" }}>
        {/* <Box component='section' sx={{background: `url(${image1})`, height: '250px', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
        </Box> */}
        <div style={{ position: "relative" }}>
          <Box
            ref={slideImg}
            component="img"
            src={images.image}
            /* src={images[0].image} */
            alt="main image"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              position: "absolute",
              transition: "1s ease infinite",
            }}
          />
          <Box
            component="div"
            sx={{
              background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))",
              position: "absolute",
              height: "100%",
              width: "100%",
            }}
          />
          <div style={{ display: "flex" }}>
            <Box
              component="div"
              sx={{
                position: "relative",
                maxWidth: { xs: "100%", sm: "70%", md: "50%", lg: "50%" },
                padding: "2rem",
                flex: 1,
              }}
            >
              <Typography component="h3" variant="h4" color="white">
                {text.title}
              </Typography>
              <Typography
                component="h4"
                variant="h6"
                color="white"
                sx={{ margin: "10px 0" }}
              >
                {text.desc}
              </Typography>
              <Link to={text.link} className="links">
                <Typography variant="body1">{text.linkName}</Typography>
              </Link>
            </Box>
          </div>
        </div>
      </Box>
      <Box
        component="section"
        sx={{
          display: { xs: "block", sm: "block", md: "flex", lg: "flex" },
          gap: "1rem",
          marginTop: "5rem",
          position: "relative",
          padding: "0 24px",
        }}
      >
        <div style={{ flex: 1 }}>
          <Card sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="h2" variant="h5">
                  Featured post
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="h6"
                >
                  Nov 12
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.black"
                  component="p"
                >
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content.
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Link color="primary" to={"#"} className="links">
                  <Typography component="h6" variant="subtitle1">
                    Continue reading...
                  </Typography>
                </Link>
              </Box>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={image2}
              alt="Live from space album cover"
            />
          </Card>
        </div>

        <div style={{ flex: 1 }}>
          <Card
            sx={{
              display: "flex",
              marginTop: { xs: "2rem", sm: "2rem", md: 0, lg: 0 },
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="h2" variant="h5">
                  Post title
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="h6"
                >
                  Nov 12
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.black"
                  component="p"
                >
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content.
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Link color="primary" to={"#"} className="links">
                  <Typography component="h6" variant="subtitle1">
                    Continue reading...
                  </Typography>
                </Link>
              </Box>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={image2}
              alt="Live from space album cover"
            />
          </Card>
        </div>
      </Box>

      <Box component="section" sx={{ padding: "0 24px", marginTop: "3rem" }}>
        <Typography component="h6" variant="h6" mb={1}>
          People you may know
        </Typography>
        <Box sx={{ display: "flex", gap: "2rem", overflow: "auto", padding: '5px' }}>
          {items.map((item) => (
            <Box sx={{boxShadow: '0 5px 45px rgba(0, 0, 0, 0.10)', padding:'5px', borderRadius:'3px', background:'ghostwhite'}}>
              <Link to="/profile">
              <Box>
                <Box
                  component="img"
                  src={userImg}
                  alt=""
                  className="may-know-user-pic"
                />
              </Box>
              </Link>
              <Typography component="p" sx={{ textAlign: "center" }}>
                this_user
              </Typography>
              <Button
                size="small"
                variant="contained"
                sx={{
                  fontSize: ".7rem",
                  textTransform: "lowercase !important",
                }}
              >
                Follow
              </Button>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        component="section"
        sx={{
          display: { xs: "block", sm: "block", md: "flex", lg: "flex" },
          padding: "0 24px",
          gap: "2rem",
          marginTop: "3rem",
        }}
      >
        <Box sx={{ flex: 2 }}>
          <Box component="header">
            <Typography component="h6" variant="h6">
              From the filehose
            </Typography>
          </Box>
          <Box component="hr" borderTop="1px solid#eee" />
          <Box
            component="div"
            sx={{
              marginTop: "1rem",
              textAlign: {
                xs: "justify",
                sm: "justify",
                md: "unset",
                lg: "unset",
              },
            }}
          >
            <Typography component="h1" variant="h4">
              Sample blog post
            </Typography>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Typography component="p" color="text.secondary">
                <em>April 1, 2020 by</em>
              </Typography>
              <Link to={"/#"} className="links">
                <Typography>Oliver</Typography>
              </Link>
            </Box>
            <Typography component="p" sx={{ marginTop: ".5rem" }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat
              porro hic magnam commodi! Doloribus molestiae id expedita
              suscipit, perspiciatis ut?
            </Typography>
            <Typography component="p">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat
              porro hic magnam commodi! Doloribus molestiae id expedita
              suscipit, perspiciatis ut?
            </Typography>
            <Typography component="p">
              Lorem ipsum dolor sit, amet <b>consectetur adipisicing elit.</b>{" "}
              Laborum dolorem minima eum iure voluptatibus ad! Quisquam omnis
              excepturi reiciendis enim velit dignissimos. Sed explicabo, earum
              doloremque totam iure omnis natus ex enim, dolor voluptatum odio,
              non quidem nesciunt? Suscipit ratione iste totam ducimus alias non
              ullam autem itaque error deleniti?
            </Typography>
          </Box>
        </Box>

        <Box
          component="aside"
          sx={{
            flex: 1,
            marginTop: { xs: "2rem", sm: "2rem", md: "unset", lg: "unset" },
          }}
        >
          {/* About the App */}
          <Box
            component="div"
            sx={{
              background: "#eee",
              padding: "2rem",
              borderRadius: "7px",
              textAlign: { xs: "center", sm: "center" },
            }}
          >
            <Typography component="h6" variant="h6">
              About
            </Typography>
            <Typography component="p" variant="subtitle1">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat
              iste nobis alias officiis vel optio?
            </Typography>
          </Box>

          {/* Gallery links */}

          <Box
            component="div"
            sx={{
              marginTop: "1rem",
              textAlign: { xs: "center", sm: "center" },
            }}
          >
            <Typography component="h6" variant="h6">
              Gallery
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {galleryList.map((list) => (
                <Box component="li">
                  <Link to={list.link} className="links">
                    <Typography
                      component="p"
                      variant="subtitle2"
                      fontWeight="500"
                    >
                      {list.linkName}
                    </Typography>
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default HerosSection