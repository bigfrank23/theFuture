import { Alert, Avatar, Box, Button, CircularProgress, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from "formik";
import * as Yup from "yup";
import profileImg from '../../images/profile4.jpg'
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import './auth.css'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/userSlice';
import PhoneInput from "react-phone-input-international";
import "react-phone-input-international/lib/style.css";
import cogoToast from "cogo-toast";
import { TagsInput } from "react-tag-input-component";
// import Input, { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
// import en from 'react-phone-number-input/locale/en.json';
// import 'react-phone-number-input/style.css';


const Auth = () => {
  const [activeClass, setActiveClass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
    
    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleShowPassword2 = () => setShowPassword2(!showPassword2);

    const dispatch = useDispatch();
    const userStatus = useSelector((state) => state.user.status);
    const userError = useSelector((state) => state.user.error);

  //Form validation
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    userName: Yup.string()
      .required("User Name is required")
      .min(3, "User Name must be at least 3 characters")
      .max(20, "User Name must not exceed 20 characters"),
    phone: Yup.string()
      // .matches(/^\d{10}$/, "Invalid phone number")
      .required("Required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    interests: Yup.array()
      .of(Yup.string().required("Interest is required"))
      .min(1, "At least one interest is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    profilePhoto: Yup.string()
      .required("A profile photo is required")
      .test(
        "fileSize",
        "File too large, maximum size is 5MB",
        (value) => value && value.size <= 5000000
      )
      .test(
        "fileType",
        "Unsupported file format, please upload a JPEG or PNG",
        (value) => value && /(jpeg|png)/.test(value.type)
      ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      phone: "",
      email: "",
      interest: "",
      password: "",
      confirmPassword: "",
      profilePhoto: []
    },
    validationSchema,
    // validateOnChange: false,
    // validateOnBlur: false,
    onSubmit: async (values) => {
      const formData = new FormData();

      for (let value in values) {
        formData.append(value, values[value]);
      }
      // formData.append("email", values.email);
      // formData.append("password", values.password);
      // formData.append("profilePhoto", values.profilePhoto);
      // console.log(JSON.stringify(data, null, 2));
      // console.log(formData);
      console.log(values);

      dispatch(registerUser(formData));

      // alert(userError)

      // Show success message if registration was successful
      if (userStatus === "success") {
        cogoToast.success("Registration successful!");
      }

      // Show error message if there was an error during registration
      if (userError) {
        cogoToast.error(userError);
      }
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
            <Box className="form signinForm">
              <Box
                component="form"
                onSubmit={formik.handleSubmit}
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
                    border={formik.errors.email ? "thin solid red" : null}
                    onChange={formik.handleChange}
                  />
                  <Typography variant="caption" color="red">
                    {formik.errors.email ? formik.errors.email : null}
                  </Typography>
                </div>
                <div>
                  <Box
                    component="input"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    border={formik.errors.password ? "thin solid red" : null}
                    onChange={formik.handleChange}
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
                    {formik.errors.password ? formik.errors.password : null}
                  </Typography>
                </div>
                <Box component="input" type="submit" value="Login" />
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
                {/* <div>
                  <AddPhotoAlternateIcon
                    onClick={() => setShowPicker(!showPicker)}
                    sx={{ fill: "#5d8ffc", cursor: "pointer" }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    name="profilePhoto"
                    onChange={(e) =>
                      formik.setFieldValue(
                        "profilePhoto",
                        e.currentTarget.files[0]
                      )
                    }
                    required
                  />
                </div> */}
                <div>
                  {userStatus === "failed" && (
                    <Alert color="error" onClose={() => {}}>
                      Failed!
                    </Alert>
                  )}
                  {userStatus === "success" && (
                    <Alert onClose={() => {}}>Successful!</Alert>
                  )}
                  <Alert onClose={() => {}}>{userError}</Alert>
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
                    <div>{formik.errors.profilePhoto}</div>
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
                    // value={selected}
                    // onChange={setSelected}
                    value={formik.values.interest}
                    name="interest"
                    onChange={(newValues) => formik.setFieldValue('interests', newValues)}
                    onBlur={formik.handleBlur}
                    placeHolder="Add one or more interests"
                  />
                  {formik.touched.interest && formik.errors.interest ? (
                    <Typography variant="caption" color="red">
                      {formik.errors.interest}
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
                  >
                    {userStatus === "loading" ? "processing..." : "Register"}
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