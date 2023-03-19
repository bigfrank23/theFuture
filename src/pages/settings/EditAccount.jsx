import { Box, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "../auth/auth.css";
import profileImg from '../../images/profile4.jpg'

const EditAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowPassword2 = () => setShowPassword2(!showPassword2);
  return (
    <>
      {/* Signup */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", transition: "0.5s", background: "#2196f3", padding: '3rem' } } >
        <Box className="container">
            <Box className="blueBg" sx={{display: 'unset !important'}}>
            <Box className="box signup" sx={{position: 'relative !important'}}>
                <Box component='img' src={profileImg} alt='' sx={{width: '100px', height: '100px', borderRadius: '50%'}} />
                <button className="signupBtn" style={{marginTop: '5px'}}>
                Change Profile Photo
              </button>
            </Box>
            </Box>
            <Box className="activeFormBx">
            <Box className="form signupForm">
                <Box component="form" autoComplete="off" noValidate>
                <Box sx={{ display: "flex", gap: ".3rem" }}>
                    <Typography component="h3">Edit Account</Typography>
                </Box>
                <Divider sx={{ mb: 1 }} />
                <div>
                    <Box
                    component="input"
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    />
                </div>
                <div>
                    <Box
                    component="input"
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    />
                </div>
                <div>
                    <Box
                    component="input"
                    type="text"
                    placeholder="User Name"
                    name="userName"
                    />
                </div>
                <div>
                    <Box
                    component="input"
                    type="text"
                    placeholder="Phone Number"
                    name="phone"
                    />
                </div>
                <div>
                    <Box
                    component="input"
                    type="email"
                    placeholder="Email"
                    name="email"
                    />
                </div>
                <div>
                    <Box
                    component="input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    />
                    <Box
                    sx={{
                        position: "absolute",
                        right: "15px",
                        marginBlock: "-33px",
                        color: "#333",
                        cursor: "pointer",
                    }}
                    onClick={handleShowPassword}
                    >
                    {!showPassword ? <Visibility /> : <VisibilityOff />}
                    </Box>
                </div>
                <div>
                    <Box
                    component="input"
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    />
                    <Box
                    sx={{
                        position: "absolute",
                        right: "15px",
                        marginBlock: "-33px",
                        color: "#333",
                        cursor: "pointer",
                    }}
                    onClick={handleShowPassword2}
                    >
                    {!showPassword2 ? <Visibility /> : <VisibilityOff />}
                    </Box>
                </div>
                <Box component="input" type="submit" value="Register" />
                </Box>
            </Box>
            </Box>
        </Box>

      </Box>
    </>
  );
};

export default EditAccount;
