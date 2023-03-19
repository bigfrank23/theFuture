import React, {useState} from 'react'
import { Box, Button, IconButton, Select, Switch, TextField, Typography } from '@mui/material';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import VerifiedIcon from "@mui/icons-material/Verified";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import profileImg from "../../../images/profile4.jpg";
import coverImg from "../../../images/sea.jpg";

const ProfilePageUpdate = () => {
  const [toggleLocation, setToggleLocation] = useState(true)

  const handleChange = (e) => {
    setToggleLocation(!toggleLocation)
  }
  return (
    <>
      <Box sx={{ padding: "0 24px", marginTop: "4rem" }}>
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
              width: {xs: '100%', sm: 'auto', md: 'auto', lg: '40%'},
              padding: "3rem",
              textAlign: "center",
              color: "#fff",
              boxShadow: "0 10px 25px 0 rgb(0 0 0 / 30%)",
              filter: "drop-shadow(2px 4px 6px rgb(0 0 0 / 30%))",
            }}
          >
            <Box
              component="img"
              src={profileImg}
              sx={{
                width: "123px",
                height: "123px",
                borderRadius: "50%",
                boxShadow: "0 10px 25px 0 rgb(0 0 0 / 30%)",
                border: "1px solid #fff",
              }}
            />
            <Box
              sx={{ display: "flex", gap: "1rem", justifyContent: "center" }}
            >
              <Box
              component='input'
                required
                placeholder="User Name"
                sx={{
                marginTop: "1rem",
                borderRadius: "4px",
                background: "#fff",
                padding: '9px',
                fontSize: '.8rem',
                width: '100%',
                border:0,
                outline:0
              }}
              />
              <VerifiedIcon sx={{ fontSize: "1rem" }} />
            </Box>
            <Box
            component='input'
              required
              placeholder="Job Title"
              sx={{
                marginTop: "1rem",
                borderRadius: "4px",
                background: "#fff",
                padding: '9px',
                fontSize: '.8rem',
                width: '100%',
                border:0,
                outline:0
              }}
            />
            <Box
            component='input'
              required
              placeholder="A litte info about yourself"
              sx={{
                marginTop: "1rem",
                borderRadius: "4px",
                background: "#fff",
                padding: '9px',
                fontSize: '.8rem',
                width: '100%',
                border:0,
                outline:0
              }}
            />

            <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                <Box component="input" type="date" />
              </Box>
              <Box>
                <Switch
                  checked={toggleLocation}
                  onChange={handleChange}
                  size="small"
                  sx={{ float: "left" }}
                />
                <Box
                  sx={
                    !toggleLocation
                      ? { display: "none" }
                      : {
                          display: "flex",
                          gap: ".3rem",
                          color: "#ccc",
                        }
                  }
                >
                  <PlaceOutlinedIcon
                    sx={{ fontSize: "1rem", alignSelf: "center" }}
                  />

                  <Typography component="span" variant="caption">
                    Lagos
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProfilePageUpdate