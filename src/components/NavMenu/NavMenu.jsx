import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CloseIcon from "@mui/icons-material/Close";
// import MailIcon from '@mui/icons-material/Mail';
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import PaletteIcon from '@mui/icons-material/Palette';
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import MoreIcon from '@mui/icons-material/MoreVert';
import PeopleIcon from "@mui/icons-material/People";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import './navMenu.css'
import SideBar from '../sideBar/SideBar';
import { Backdrop, Button, Drawer, Fade, Modal, Pagination, Radio, Stack, SwipeableDrawer, Switch } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import { Link } from 'react-router-dom';
import userImg from '../../images/user3.jpg'
import ChatInput from '../richTextInput/ChatInput';
import axios from 'axios'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
  backgroundColor: 'rgb(243, 246, 249)',
    color: 'rgb(62, 80, 96)',
    fontSize: '0.875rem',
    border: '1px solid rgb(224, 227, 231)',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#0071e5",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#0071e5",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const appBarStyles = {
  backdropFilter: 'blur(8px)',
    borderStyle: 'solid',
    borderColor: '#E7EBF0',
    borderWidth: 0,
    borderBottomWidth: 'thin',
    background: 'rgba(255,255,255,0.8)',
    color: '#0071e5 !important',
    boxShadow:'none !important'
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  border: "2px solid #5d8ffc",
  boxShadow: 24,
  padding: '0 2rem 2rem 2rem'
};
const notificationModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  border: "2px solid #ccc",
  boxShadow: 24,
  padding: '0 2rem 2rem 2rem'
};

const friends = [
  {
    id: 1,
    img: userImg,
    name: 'User 1'
  },
  {
    id: 2,
    img: userImg,
    name: 'User 2'
  },
  {
    id: 3,
    img: userImg,
    name: 'User 3'
  },
  {
    id: 4,
    img: userImg,
    name: 'User 4'
  },
]

const messages = [
  {
    id: 1,
    img: userImg,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, totam.",
    online: true
  },
  {
    id: 2,
    img: userImg,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, totam.",
    online: false
  },
  {
    id: 3,
    img: userImg,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, totam.",
    online: true
  },
  {
    id: 4,
    img: userImg,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, totam.",
    online: false
  },
];

const notifications = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, totam.",
  },
  {
    id: 2,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, totam.",
  },
  {
    id: 3,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, totam.",
  },
  {
    id: 4,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, totam.",
  },
];

const truncateText = {
  whiteSpace: "nowrap " /* prevent the text from wrapping to the next line */,
  overflow: "hidden" /* hide any overflowing text */,
  textOverflow:
    "ellipsis" /* display an ellipsis (...) to indicate truncated text */,
  width: "200px" /* set the width of the element to the desired value */,
};

const getNavColor = localStorage.getItem('navColor')
export default function NavMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [settingsAnchorEl, setSettingsAnchorEl] = React.useState(null);
  const [friendsAnchorEl, setFriendsAnchorEl] = React.useState(null);
  const [messagesAnchorEl, setMessagesAnchorEl] = React.useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isSettingsMenuOpen = Boolean(settingsAnchorEl);
  const isFriendsMenuOpen = Boolean(friendsAnchorEl);
  const isMessagesMenuOpen = Boolean(messagesAnchorEl);
  const isNotificationsMenuOpen = Boolean(notificationsAnchorEl);

   const [open, setOpen] = React.useState(false);
   const [selectedValue, setSelectedValue] = React.useState("default");
   const [content, setContent] = React.useState(null);
   const [toggleNavColor, setToggleNavColor] = React.useState(Boolean(getNavColor));
   const [modalData, setModalData] = React.useState("");

   const [query, setQuery] = React.useState('')
   const [results, setResults] = React.useState([])

   const highlightMatch = (text, match) => {
    const regex = new RegExp(`(${match})`, 'gi')
    return text.split(regex).map((part, i)=> (
      part.toLowerCase() === match.toLowerCase() ? <mark key={i}>{part}</mark> : part
    ))
   }

   const toggleDrawer = (open) => (event) => {
     if (
       event &&
       event.type === "keydown" &&
       (event.key === "Tab" || event.key === "Shift")
     ) {
       return;
     }
     setOpen(open);
   };
  const handleClick = (newContent) => {
    setOpen(true);
    setContent(newContent);
  };

   const handleDrawerClose = () => {
     setOpen(false);
   };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsMenuOpen = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleFriendsMenuOpen = (event) => {
    setFriendsAnchorEl(event.currentTarget);
  };

  const handleMessagesMenuOpen = (event) => {
    setMessagesAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenuOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleSettingsMenuClose = () => {
    setSettingsAnchorEl(null);
  };
  const handleFriendsMenuClose = () => {
    setFriendsAnchorEl(null);
  };
  const handleMessagesMenuClose = () => {
    setMessagesAnchorEl(null);
  };
  const handleNotificationsMenuClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    handleSettingsMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleChange = async(event) => {
    setToggleNavColor(!toggleNavColor)
    console.log(toggleNavColor);
    handleDrawerClose()
    localStorage.setItem("navColor", toggleNavColor);
  };
 

  // For appearance menu setting
  const appearanceMenu = (
    <>
    <Box sx={{display: 'flex',  gap: '.5rem', justifyContent: 'center',textAlign: 'center', mb: 1 }}>
        <PaletteIcon />
        <Typography component="p" variant="subtitle2" marginLeft="0px" sx={{alignSelf: 'center', fontWeight: 600}}> Appearance </Typography>
    </Box>
        <Divider />
      <Box sx={{display: 'flex', justifyContent: 'center', gap: '1.5rem', textAlign: 'center'}}>
        <Box>
        <Typography component='h6' variant='subtitle1' textAlign='center'>Switch Navbar Color</Typography>
        <Switch onChange={handleChange} checked={toggleNavColor} size='small' />
        </Box>
      </Box>
    </>
  );

  // For account menu setting
  const accountMenu = (
    <>
    <Box sx={{display: 'flex',  gap: '.5rem', justifyContent: 'start',textAlign: 'center', mb: 1 }}>
        <Avatar />
        <Typography component="p" variant="subtitle2" marginLeft="0px" sx={{alignSelf: 'center', fontWeight: 600}}> Account Setting </Typography>
    </Box>
        <Divider />
      <Box  className='posts-links' sx={{display: 'flex', justifyContent: 'start', gap: '1.5rem', textAlign: 'center', margin: '10px 0'}}>
        <Button variant='contained' color='primary' size='small' startIcon={<EditIcon/>}>Edit Account</Button>
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'start', gap: '1.5rem', textAlign: 'center'}}>
        <Button variant='contained' color='error' size='small' startIcon={<DeleteIcon/>}>Delete Account</Button>
      </Box>
    </>
  );

  const menuId = "primary-search-account-menu";
  

  const mobileMenuId = "primary-search-account-menu-mobile";

  // Mobile Menu (Small screens)
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Typography
          component="h5"
          variant="subtitle1"
          fontWeight={700}
          textAlign="center"
        >
          Franklin
        </Typography>
        <Box
          width="8px"
          height="8px"
          borderRadius="50%"
          backgroundColor="lime"
          marginLeft="6px"
        />
      </MenuItem>
      <MenuItem component={Link} to="/profile">
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle color="primary" />
        </IconButton>
        <Typography component="p" variant="subtitle2" marginLeft="10px">
          Profile
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleFriendsMenuOpen}>
        <IconButton size="large" aria-label="friends of current user">
          <Badge badgeContent={"10k"} color="primary">
            <PeopleIcon />
          </Badge>
        </IconButton>
        <Typography component="p" variant="subtitle2" marginLeft="10px">
          Friends
        </Typography>
      </MenuItem>
      {/* Display this pop when people Icon is clicked (For small Screens)*/}
      <Menu
        anchorEl={friendsAnchorEl}
        id="settings"
        open={isFriendsMenuOpen}
        onClose={handleFriendsMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: { xs: 114, sm: 114, md: 14, lg: 14 },
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleMenuClose} sx={{ justifyContent: "center" }}>
          <Typography
            component="p"
            variant="subtitle1"
            marginLeft="0px"
            fontWeight={600}
          >
            Friends
          </Typography>
        </MenuItem>
        <Divider />
        {friends.map((friend) => (
          <MenuItem onClick={handleMenuClose} sx={{ justifyContent: "center" }}>
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              key={friend.id}
            >
              <Avatar src={friend.img} />
            </IconButton>
            <Typography component="p" variant="subtitle2" marginLeft="0px">
              {friend.name}
            </Typography>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <Stack>
            <Pagination count={3} color="primary" variant="outlined" />
          </Stack>
        </MenuItem>
      </Menu>
      <MenuItem onClick={handleMessagesMenuOpen}>
        <IconButton size="small" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailOutlinedIcon color="primary" />
          </Badge>
        </IconButton>
        <Typography component="p" variant="subtitle2" marginLeft="10px">
          Messages
        </Typography>
      </MenuItem>
      {/* Display this pop when message Icon is clicked (For  mobile) */}
      <Menu
        anchorEl={messagesAnchorEl}
        id="friends"
        open={isMessagesMenuOpen}
        onClose={handleMessagesMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1 },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: { xs: 114, sm: 114, md: 14, lg: 14 },
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleMenuClose} sx={{ justifyContent: "center" }}>
          <Typography
            component="p"
            variant="subtitle1"
            marginLeft="0px"
            fontWeight={600}
          >
            Messages
          </Typography>
        </MenuItem>
        <Divider />
        {messages.map((message) => (
          <div>
            <MenuItem
              // onClick={handleMenuClose}
              sx={{ justifyContent: "center" }}
            >
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                key={message.id}
                onClick={() => {
                  setOpen(true);
                  setModalData(message);
                }}
              >
                <Avatar
                  src={message.img}
                  sx={
                    message.online === true
                      ? { borderTop: "2px solid lime" }
                      : { borderTop: "2px solid tomato" }
                  }
                />
              </IconButton>
              <Typography
                component="p"
                variant="subtitle2"
                marginLeft="0px"
                sx={truncateText}
                onClick={() => {
                  setOpen(true);
                  setModalData(message);
                }}
              >
                {message.text}
              </Typography>
            </MenuItem>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={() => setOpen(false)}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box sx={modalStyle}>
                  <Box>
                    <Box
                      sx={{
                        textAlign: "center",
                        mb: 2,
                        color: "#333",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography component="span" variant="caption">
                        Ruth is typing...
                      </Typography>
                      <Typography component="span" variant="caption">
                        Online
                      </Typography>
                      <Typography component="span" variant="caption">
                        Last Seen - 8:05pm
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "5px" }}>
                      <Box
                        component="img"
                        src={modalData.img}
                        sx={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                      <Typography
                        component="p"
                        variant="subtitle2"
                        sx={{
                          background: "lavender",
                          p: 1,
                          borderRadius: "10px",
                        }}
                      >
                        {modalData.text}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                        flexDirection: "row-reverse",
                        mt: 2,
                      }}
                    >
                      <Box
                        component="img"
                        src={modalData.img}
                        sx={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                      <Typography
                        component="p"
                        variant="subtitle2"
                        sx={{
                          background: "darkgray",
                          p: 1,
                          borderRadius: "10px",
                        }}
                      >
                        {modalData.text}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <ChatInput />
                    </Box>
                  </Box>
                </Box>
              </Fade>
            </Modal>
          </div>
        ))}
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <Stack>
            <Pagination count={3} color="primary" variant="outlined" />
          </Stack>
        </MenuItem>
      </Menu>

      <MenuItem onClick={handleNotificationsMenuOpen}>
        <IconButton
          size="small"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsOutlinedIcon color="primary" />
          </Badge>
        </IconButton>
        <Typography component="p" variant="subtitle2" marginLeft="10px">
          Notifications
        </Typography>
      </MenuItem>
      {/* Display this pop when Notification Icon is clicked (For mobile) */}
      <Menu
        anchorEl={notificationsAnchorEl}
        id="notification"
        open={isNotificationsMenuOpen}
        onClose={handleNotificationsMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1 },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: { xs: 114, sm: 114, md: 14, lg: 14 },
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleMenuClose} sx={{ justifyContent: "center" }}>
          <Typography
            component="p"
            variant="subtitle1"
            marginLeft="0px"
            fontWeight={600}
          >
            Notification
          </Typography>
        </MenuItem>
        <Divider />
        {notifications.map((notification) => (
          <div>
            <MenuItem
              // onClick={handleMenuClose}
              sx={{ justifyContent: "center" }}
            >
              <Box sx={{ display: "flex", gap: "5px" }}>
                <NotificationsOutlinedIcon />
                <Typography
                  component="p"
                  variant="subtitle2"
                  marginLeft="0px"
                  sx={truncateText}
                  onClick={() => {
                    setOpen(true);
                    setModalData(notification);
                  }}
                >
                  {notification.text}
                </Typography>
              </Box>
            </MenuItem>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={() => setOpen(false)}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box sx={notificationModalStyle}>
                  <Box>
                    <Box className="animate-modal-notification-icon">
                      <NotificationsIcon />
                    </Box>
                    <Typography component="p" variant="subtitle2">
                      {modalData.text}
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            </Modal>
          </div>
        ))}
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <Stack>
            <Pagination count={3} color="primary" variant="outlined" />
          </Stack>
        </MenuItem>
      </Menu>
      <MenuItem onClick={handleSettingsMenuOpen}>
        <IconButton size="small" aria-label="settings" color="inherit">
          <SettingsOutlinedIcon color="primary" />
        </IconButton>
        <Typography component="p" variant="subtitle2" marginLeft="10px">
          Settings
        </Typography>
      </MenuItem>
      {/* Display this pop when setting Icon is clicked  (For small Screens)*/}
      <Menu
        anchorEl={settingsAnchorEl}
        id="settings"
        open={isSettingsMenuOpen}
        onClose={handleSettingsMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: { xs: 114, sm: 114, md: 14, lg: 14 },
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleMenuClose}>
          <IconButton
            size="small"
            aria-label="appearance settings"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={() => handleClick(appearanceMenu)}
          >
            <AutoFixHighIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} />
          </IconButton>
          <Typography
            component="p"
            variant="subtitle2"
            marginLeft="0px"
            onClick={() => handleClick(appearanceMenu)}
          >
            Appearance
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <IconButton
            size="small"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={() => handleClick(accountMenu)}
          >
            <Avatar />
          </IconButton>
          <Typography
            component="p"
            variant="subtitle2"
            marginLeft="0px"
            onClick={() => handleClick(accountMenu)}
          >
            My Account
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <Typography component="p" variant="subtitle2" marginLeft="0px">
            Settings
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography component="p" variant="subtitle2" marginLeft="0px">
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Menu>
  );

  return (
    // Main Menu (Large screens)
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className={getNavColor === 'false' ? 'primaryNav' : 'customNav'}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            component={Link}
            to="/"
          >
            <HomeIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            GADAHERE
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e)=> setQuery(e.target.value)}
              value={query}
            />
          </Search>
          <Box sx={{ display: { xs: "none", md: "flex", gap: ".5rem" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              component={Link}
              to="/profile"
            >
              <AccountCircle />
            </IconButton>
            <Typography variant="caption" alignSelf="center">
              Franklin
            </Typography>
            <Box
              width="8px"
              height="8px"
              borderRadius="50%"
              backgroundColor="lime"
              alignSelf="center"
            />
            <Box component="div" sx={{ display: "flex", marginLeft: "1rem" }}>
              <IconButton
                size="large"
                aria-label="friends of current user"
                onClick={handleFriendsMenuOpen}
              >
                <Badge badgeContent={"10k"} color="primary">
                  <PeopleIcon />
                </Badge>
              </IconButton>
              {/* Display this pop when people Icon is clicked */}
              <Menu anchorEl={friendsAnchorEl} id="friends" open={isFriendsMenuOpen} onClose={handleFriendsMenuClose} PaperProps={{ elevation: 0, sx: { overflow: "visible", filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))", mt: 1.5, "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1, }, "&:before": { content: '""', display: "block", position: "absolute", top: 0, right: { xs: 114, sm: 114, md: 14, lg: 14 }, width: 10, height: 10, bgcolor: "background.paper", transform: "translateY(-50%) rotate(45deg)", zIndex: 0, }, }, }} transformOrigin={{ horizontal: "right", vertical: "top" }} anchorOrigin={{ horizontal: "right", vertical: "bottom" }} >
                <MenuItem
                  onClick={handleMenuClose}
                  sx={{ justifyContent: "center" }}
                >
                  <Typography
                    component="p"
                    variant="subtitle1"
                    marginLeft="0px"
                    fontWeight={600}
                  >
                    Friends
                  </Typography>
                </MenuItem>
                <Divider />
                {friends.map((friend) => (
                  <MenuItem
                    onClick={handleMenuClose}
                    sx={{ justifyContent: "center" }}
                  >
                    <IconButton
                      size="small"
                      aria-label="account of current user"
                      aria-controls="primary-search-account-menu"
                      aria-haspopup="true"
                      color="inherit"
                      key={friend.id}
                    >
                      <Avatar src={friend.img} />
                    </IconButton>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      marginLeft="0px"
                    >
                      {friend.name}
                    </Typography>
                  </MenuItem>
                ))}
                <Divider />
                <MenuItem onClick={handleMenuClose}>
                  <Stack>
                    <Pagination count={3} color="primary" variant="outlined" />
                  </Stack>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={handleMessagesMenuOpen}
            >
              <Badge badgeContent={4} color="error">
                <MailOutlinedIcon />
              </Badge>
            </IconButton>
            {/* Display this pop when message Icon is clicked */}
            <Menu anchorEl={messagesAnchorEl} id="friends" open={isMessagesMenuOpen} onClose={handleMessagesMenuClose} PaperProps={{ elevation: 0, sx: { overflow: "visible", filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))", mt: 1.5, "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1, }, "&:before": { content: '""', display: "block", position: "absolute", top: 0, right: { xs: 114, sm: 114, md: 14, lg: 14 }, width: 10, height: 10, bgcolor: "background.paper", transform: "translateY(-50%) rotate(45deg)", zIndex: 0, }, }, }} transformOrigin={{ horizontal: "right", vertical: "top" }} anchorOrigin={{ horizontal: "right", vertical: "bottom" }} >
              <MenuItem
                onClick={handleMenuClose}
                sx={{ justifyContent: "center" }}
              >
                <Typography
                  component="p"
                  variant="subtitle1"
                  marginLeft="0px"
                  fontWeight={600}
                >
                  Messages
                </Typography>
              </MenuItem>
              <Divider />
              {messages.map((message) => (
                <div>
                <MenuItem
                  onClick={handleMenuClose}
                  sx={{ justifyContent: "center" }}
                >
                  <IconButton
                    size="small"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    key={message.id}
                    onClick={()=> {setOpen(true); setModalData(message)}}
                  >
                    <Avatar src={message.img} sx={message.online === true ? {borderTop: '2px solid lime'} : {borderTop: '2px solid tomato'}} />
                  </IconButton>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    marginLeft="0px"
                    sx={truncateText}
                    onClick={()=> {setOpen(true); setModalData(message)}}
                  >
                    {message.text}
                  </Typography>
                </MenuItem>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={() => setOpen(false)}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                <Fade in={open}>
                  <Box sx={modalStyle}>
                    <Box>
                      <Box sx={{textAlign: 'center', mb:2, color: '#333', display: 'flex', flexDirection: 'column'}}>
                        <Typography component='span' variant='caption'>Ruth is typing...</Typography>
                        <Typography component='span' variant='caption'>Online</Typography>
                        <Typography component='span' variant='caption'>Last Seen - 8:05pm</Typography>
                      </Box>
                    <Box sx={{display: 'flex', gap: '5px'}}>
                      <Box component='img' src={modalData.img} sx={{width: '50px', height: '50px', borderRadius:'50%'}} />
                      <Typography component='p' variant='subtitle2' sx={{background: 'lavender', p:1, borderRadius: '10px'}}>{modalData.text}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', gap: '5px', flexDirection: 'row-reverse', mt:2}}>
                      <Box component='img' src={modalData.img} sx={{width: '50px', height: '50px', borderRadius:'50%'}} />
                      <Typography component='p' variant='subtitle2' sx={{background: 'darkgray', p:1, borderRadius: '10px'}}>{modalData.text}</Typography>
                    </Box>
                    <Box sx={{mt:2}}>
                      <ChatInput />
                    </Box>
                  </Box>
                  </Box>
                  </Fade>
                  </Modal>
                </div>
              ))}
              <Divider />
              <MenuItem onClick={handleMenuClose}>
                <Stack>
                  <Pagination count={3} color="primary" variant="outlined" />
                </Stack>
              </MenuItem>
            </Menu>

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleNotificationsMenuOpen}
            >
              <Badge badgeContent={17} color="error">
                <NotificationsOutlinedIcon />
              </Badge>
            </IconButton>
            {/* Display this pop when Notification Icon is clicked */}
            <Menu anchorEl={notificationsAnchorEl} id="notification" open={isNotificationsMenuOpen} onClose={handleNotificationsMenuClose} PaperProps={{ elevation: 0, sx: { overflow: "visible", filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))", mt: 1.5, "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1, }, "&:before": { content: '""', display: "block", position: "absolute", top: 0, right: { xs: 114, sm: 114, md: 14, lg: 14 }, width: 10, height: 10, bgcolor: "background.paper", transform: "translateY(-50%) rotate(45deg)", zIndex: 0, }, }, }} transformOrigin={{ horizontal: "right", vertical: "top" }} anchorOrigin={{ horizontal: "right", vertical: "bottom" }} >
              <MenuItem
                onClick={handleMenuClose}
                sx={{ justifyContent: "center" }}
              >
                <Typography
                  component="p"
                  variant="subtitle1"
                  marginLeft="0px"
                  fontWeight={600}
                >
                  Notification
                </Typography>
              </MenuItem>
              <Divider />
              {notifications.map((notification) => (
                <div>
                <MenuItem
                  onClick={handleMenuClose}
                  sx={{ justifyContent: "center" }}
                >
                  <Box sx={{display: 'flex', gap: '5px'}}>
                    <NotificationsOutlinedIcon />
                    <Typography
                      component="p"
                      variant="subtitle2"
                      marginLeft="0px"
                      sx={truncateText}
                      onClick={()=> {setOpen(true); setModalData(notification)}}
                    >
                      {notification.text}
                    </Typography>
                  </Box>
                </MenuItem>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={() => setOpen(false)}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                <Fade in={open}>
                  <Box sx={notificationModalStyle}>
                    <Box>
                      <Box className='animate-modal-notification-icon'><NotificationsIcon/></Box>
                      <Typography component='p' variant='subtitle2'>{modalData.text}</Typography>
                    </Box>
                  </Box>
                  </Fade>
                  </Modal>
                </div>
              ))}
              <Divider />
              <MenuItem onClick={handleMenuClose}>
                <Stack>
                  <Pagination count={3} color="primary" variant="outlined" />
                </Stack>
              </MenuItem>
            </Menu>

            <IconButton
              size="large"
              aria-label="settings"
              color="inherit"
              onClick={handleSettingsMenuOpen}
            >
              <SettingsOutlinedIcon />
            </IconButton>
            {/* Display this pop when setting Icon is clicked */}
            <Menu
              anchorEl={settingsAnchorEl}
              id="settings"
              open={isSettingsMenuOpen}
              onClose={handleSettingsMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: { xs: 114, sm: 114, md: 14, lg: 14 },
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleMenuClose}>
                <IconButton
                  size="small"
                  aria-label="appearance settings"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => handleClick(appearanceMenu)}
                >
                  <AutoFixHighIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} />
                </IconButton>
                <Typography
                  component="p"
                  variant="subtitle2"
                  marginLeft="0px"
                  onClick={() => handleClick(appearanceMenu)}
                >
                  Appearance
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <IconButton
                  size="small"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <Avatar />
                </IconButton>
                <Typography component="p" variant="subtitle2" marginLeft="0px">
                  My Account
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                <Typography component="p" variant="subtitle2" marginLeft="0px">
                  Settings
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <Typography component="p" variant="subtitle2" marginLeft="0px">
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
        {/* <Button onClick={() => handleClick(appearanceMenu)}>Open Drawer</Button> */}
        <SwipeableDrawer
          open={open}
          onClose={toggleDrawer(false)}
          // onOpen={toggleDrawer(true)}
          onOpen={() => setOpen(true)}
          variant="temporary"
        >
          <DrawerHeader onClick={handleDrawerClose}>
            <CloseIcon />
          </DrawerHeader>
          <div
            style={{ width: 250, padding: 20 }}
            onClick={toggleDrawer(true)}
            onKeyDown={toggleDrawer(true)}
          >
            {content}
          </div>
        </SwipeableDrawer>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}