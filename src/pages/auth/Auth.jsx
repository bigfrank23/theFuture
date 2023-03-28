import { Alert, Avatar, Box, Button, CircularProgress, Divider, Typography, keyframes } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useFormik } from "formik";
import * as Yup from "yup";
import profileImg from '../../images/profile4.jpg'
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import './auth.css'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../../redux/userSlice';
import PhoneInput from "react-phone-input-international";
import "react-phone-input-international/lib/style.css";
import cogoToast from "cogo-toast";
import { TagsInput } from "react-tag-input-component";
import AutorenewIcon from '@mui/icons-material/Autorenew';

    
const spin = keyframes`
    100% {
        transform: rotate(360deg);
    }
    `;

    const Auth = () => {
      const [activeClass, setActiveClass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
    
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowPassword2 = () => setShowPassword2(!showPassword2);
  
  const history = useHistory()
    const dispatch = useDispatch();
    const userStatus = useSelector((state) => state.user.status);
    const userError = useSelector((state) => state.user.error);

  //Form validation
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    userName: Yup.string()
      .required("User Name is required")
      .min(3, "Username should be at least 3 characters")
      .max(16, "Username should be at most 16 characters")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Username should not include any special character"
      ),
    phone: Yup.string()
      // .matches(/^\d{10}$/, "Invalid phone number")
      .required("Required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    interests: Yup.array()
      .of(Yup.string().required("Interest is required"))
      .min(1, "At least one interest is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters")
      .max(20, "Password should be at most 20 characters")
      .matches(
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
        "Password should include at least 1 letter, 1 number and 1 special character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    profilePhoto: Yup.mixed()
      .nullable()
      .test(
        "fileSize",
        "File too large, maximum size is 5MB",
        function (value) {
          if (!value || !value.size) {
            return true; // attachment is not required
          }
          return value.size <= 5000000;
        }
      )
      .test(
        "fileType",
        "Unsupported file format, please upload a JPG, JPEG or PNG",
        function (value) {
          if (!value || !value.type) {
            return true; // attachment is not required
          }
          return /(jpeg|jpg|png)/.test(value.type);
        }
      ),
  });
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters")
      .max(20, "Password should be at most 20 characters")
      .matches(
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
        "Password should include at least 1 letter, 1 number and 1 special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      phone: "",
      email: "",
      interests: "",
      password: "",
      confirmPassword: "",
      profilePhoto: null
    },
    validationSchema,
    // validateOnChange: false,
    // validateOnBlur: false,
    onSubmit: async (values) => {

      const formData = new FormData();

      for (let value in values) {
        if (value === "profilePhoto") {
          if (values.profilePhoto !== null) {
            formData.append(value, values[value]);
          }
        } else {
          formData.append(value, values[value]);
        }
      }

      dispatch(registerUser({userData: formData, history}));
    }
  });

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    loginValidationSchema,
    onSubmit: async (values) => {

      const formData = new FormData();

      for (let value in values) {
          formData.append(value, values[value]);
      }

      dispatch(loginUser({userData: values, history}));
    }
  });

  return (
    <>
      <Box
        sx={
          !activeClass
            ? {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                transition: "0.5s",
                background: "#2196f3",
                padding: "3rem",
              }
            : {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                transition: "0.5s",
                background: "#f44336",
                padding: "3rem",
              }
        }
      >
        <Box className="container">
          <Box className="blueBg">
            <Box className="box signin">
              {formik.values.profilePhoto &&
                formik.values.profilePhoto instanceof File && (
                  <Avatar
                    src={URL.createObjectURL(formik.values.profilePhoto)}
                    alt=""
                    sx={{ margin: "0 auto 20px auto" }}
                  >
                    F
                  </Avatar>
                )}
              <Typography component="h2">Already have an Account?</Typography>
              <button
                className="signinBtn"
                onClick={() => setActiveClass(false)}
              >
                Sign in
              </button>
            </Box>
            <Box className="box signup">
              <Typography component="h2">Don't have an Account?</Typography>
              <button
                className="signupBtn"
                onClick={() => setActiveClass(true)}
              >
                Sign up
              </button>
            </Box>
          </Box>
          <Box className={!activeClass ? "formBx" : "activeFormBx"}>
            {/* Sign in */}
            <Box className="form signinForm">
              <Box
                component="form"
                onSubmit={loginFormik.handleSubmit}
                autoComplete="off"
                noValidate
              >
                <Box sx={{ display: "flex", gap: ".3rem" }}>
                  <LockIcon sx={{ alignSelf: "center" }} />
                  <Typography component="h3">Sign In</Typography>
                </Box>
                <Divider sx={{ mb: 1 }} />
                <Avatar src={profileImg} sx={{ margin: "0 auto 20px auto" }}>
                  F
                </Avatar>
                <div>
                  <Box
                    component="input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    border={loginFormik.errors.email ? "thin solid red" : null}
                    onChange={loginFormik.handleChange}
                  />
                  <Typography variant="caption" color="red">
                    {loginFormik.errors.email ? loginFormik.errors.email : null}
                  </Typography>
                </div>
                <div>
                  <Box
                    component="input"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    border={
                      loginFormik.errors.password ? "thin solid red" : null
                    }
                    onChange={loginFormik.handleChange}
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
                  <Typography variant="caption" color="red">
                    {loginFormik.errors.password
                      ? loginFormik.errors.password
                      : null}
                  </Typography>
                </div>
                {/* <Box component="input" type="submit" value="Login" /> */}
                <Box>
                  <Button
                    variant="contained"
                    onClick={loginFormik.handleSubmit}
                    sx={{
                      // background: "#f44336",
                      textTransform: "capitalize",
                      // "&:hover": { background: "#f44336" },
                    }}
                    disabled={userStatus === "loading"}
                    startIcon={
                      userStatus === "loading" && (
                        <AutorenewIcon
                          sx={{ animation: `${spin} 1s infinite ease` }}
                        />
                      )
                    }
                  >
                    {userStatus === "loading" ? "" : "Login"}
                  </Button>
                </Box>
                <Link to="/reset_password">
                  <Typography className="forgot" sx={{ color: "#333" }}>
                    Forgot Password?
                  </Typography>
                </Link>
              </Box>
            </Box>
            {/* Signup */}
            <Box className="form signupForm">
              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                autoComplete="off"
                noValidate
                encType="multipart/form-data"
              >
                <Box sx={{ display: "flex", gap: ".3rem" }}>
                  <LockIcon sx={{ alignSelf: "center" }} />
                  <Typography component="h3">Sign Up</Typography>
                </Box>
                <Divider sx={{ mb: 1 }} />
                <div>
                  <label htmlFor="profilePhoto">Profile Photo</label>
                  <input
                    id="profilePhoto"
                    name="profilePhoto"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      formik.setFieldValue(
                        "profilePhoto",
                        event.currentTarget.files[0]
                      );
                    }}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.profilePhoto && formik.errors.profilePhoto ? (
                    <Typography variant="caption" color="red">
                      {formik.errors.profilePhoto}
                    </Typography>
                  ) : null}
                </div>
                <div>
                  <Box
                    component="input"
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    border={
                      formik.touched.firstName && formik.errors.firstName
                        ? "thin solid red"
                        : null
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <Typography variant="caption" color="red">
                      {formik.errors.firstName}
                    </Typography>
                  ) : null}
                </div>
                <div>
                  <Box
                    component="input"
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    border={
                      formik.touched.lastName && formik.errors.lastName
                        ? "thin solid red"
                        : null
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <Typography variant="caption" color="red">
                      {formik.errors.lastName}
                    </Typography>
                  ) : null}
                </div>
                <div>
                  <Box
                    component="input"
                    type="text"
                    placeholder="User Name"
                    name="userName"
                    border={
                      formik.touched.userName && formik.errors.userName
                        ? "thin solid red"
                        : null
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.userName && formik.errors.userName ? (
                    <Typography variant="caption" color="red">
                      {formik.errors.userName}
                    </Typography>
                  ) : null}
                </div>

                <div>
                  <PhoneInput
                    className={
                      formik.touched.phone && formik.errors.phone
                        ? "thin solid red"
                        : null
                    }
                    inputProps={{
                      name: "phone",
                    }}
                    placeholder="Phone Number"
                    value={formik.values.phone}
                    onChange={(value) => formik.setFieldValue("phone", value)}
                    onBlur={formik.handleBlur}
                    country="ng"
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <Typography variant="caption" color="red">
                      {formik.errors.phone}
                    </Typography>
                  ) : null}
                </div>

                <div>
                  <Box
                    component="input"
                    type="email"
                    placeholder="Email"
                    name="email"
                    border={
                      formik.touched.email && formik.errors.email
                        ? "thin solid red"
                        : null
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <Typography variant="caption" color="red">
                      {formik.errors.email}
                    </Typography>
                  ) : null}
                </div>

                <div>
                  <TagsInput
                    value={formik.values.interests}
                    name="interests"
                    onChange={(newValues) =>
                      formik.setFieldValue("interests", newValues)
                    }
                    onBlur={formik.handleBlur}
                    placeHolder="Add one or more interests"
                  />
                  {formik.touched.interests && formik.errors.interests ? (
                    <Typography variant="caption" color="red">
                      {formik.errors.interests}
                    </Typography>
                  ) : null}
                </div>

                <div>
                  <Box
                    component="input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    border={
                      formik.touched.password && formik.errors.password
                        ? "thin solid red"
                        : null
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                  {formik.touched.password && formik.errors.password ? (
                    <Typography variant="caption" color="red">
                      {formik.errors.password}
                    </Typography>
                  ) : null}
                </div>
                <div>
                  <Box
                    component="input"
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    border={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? "thin solid red"
                        : null
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <Typography variant="caption" color="red">
                      {formik.errors.confirmPassword}
                    </Typography>
                  ) : null}
                </div>
                <Box>
                  <Button
                    variant="contained"
                    onClick={formik.handleSubmit}
                    sx={{
                      background: "#f44336",
                      textTransform: "capitalize",
                      "&:hover": { background: "#f44336" },
                    }}
                    disabled={userStatus === "loading"}
                    startIcon={
                      userStatus === "loading" && (
                        <AutorenewIcon
                          sx={{ animation: `${spin} 1s infinite ease` }}
                        />
                      )
                    }
                  >
                    {userStatus === "loading" ? "" : "Register"}
                  </Button>
                </Box>
                <Link to="/reset_password">
                  <Typography className="forgot" sx={{ color: "#333" }}>
                    Forgot Password?
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Auth