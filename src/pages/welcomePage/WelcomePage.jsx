import React, { useState } from "react";
import { motion } from "framer-motion";
// import welcomeSvg from "./welcome.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import { updateUser } from "../../redux/userSlice";
import cogoToast from "cogo-toast";
import { Alert, Avatar, Box, Button, Typography, keyframes, } from "@mui/material";
import AutorenewIcon from '@mui/icons-material/Autorenew';

import "./welcomPage.css";

const spin = keyframes`
    100% {
        transform: rotate(360deg);
    }
    `;

const userId = JSON.parse(localStorage.getItem("profile"))?.result?._id;
// console.log(userId)

const WelcomePage = () => {
  const [formData, setFormData] = useState({ bio: "", jobTitle: "", dob: "", maritalStatus: "", });

  const userStatus = useSelector((state) => state.user.status);
  const dispatch = useDispatch();
  const history = useHistory()

   const validateForm = () => {
     let isValid = true;
     if (
       !formData.bio ||
       !formData.jobTitle ||
       !formData.dob
     ) {
       isValid = false;
       cogoToast.error("Please fill in the required fields", {
         position: "bottom-right",
       });
     }
     return isValid;
   };

  function calculateAge() {
    const today = new Date();
    const birthDate = new Date(formData.dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    console.log(age); 
    if(age < 18){
      cogoToast.info( 'You must be atleast 18 to use this site', {
        position: "bottom-right",
      });
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(formData);
      calculateAge();
      dispatch(updateUser({ userData: formData, history, userId }));
    }
  };

  return (
    <div className="welcome-container">
      <motion.div
        className="welcome-text-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h1>Welcome!</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="bio">Please tell us a bit about yourself:</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />

          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
          />

          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />

          <label htmlFor="maritalStatus">Marital Status:</label>
          <input
            type="text"
            id="maritalStatus"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            placeholder="(Optional)"
          />

          {/* <button type="submit">Submit</button> */}
          <Button
          type='submit'
            variant="contained"
            sx={{
              textTransform: "capitalize",
            }}
            disabled={userStatus === "loading"}
            startIcon={
              userStatus === "loading" && (
                <AutorenewIcon sx={{ animation: `${spin} 1s infinite ease` }} />
              )
            }
          >
            {userStatus === "loading" ? "" : "Submit"}
          </Button>
        </form>
      </motion.div>
      <motion.svg
        className="welcome-svg"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <rect width="100%" height="auto" fill="#F5F5F5" />
        <path
          d="M290.22 195.3C290.22 219.97 269.69 240.5 245.02 240.5C220.35 240.5 199.82 219.97 199.82 195.3C199.82 170.63 220.35 150.1 245.02 150.1C269.69 150.1 290.22 170.63 290.22 195.3Z"
          fill="#FFAFCC"
        />
        <path
          d="M322.32 137.2C322.32 161.87 301.79 182.4 277.12 182.4C252.45 182.4 231.92 161.87 231.92 137.2C231.92 112.53 252.45 91.9999 277.12 91.9999C301.79 91.9999 322.32 112.53 322.32 137.2Z"
          fill="#FFC78F"
        />
        <path
          d="M175.41 95.8C175.41 120.47 154.88 141 130.21 141C105.54 141 85.009 120.47 85.009 95.8C85.009 71.1301 105.54 50.6 130.21 50.6C154.88 50.6 175.41 71.1301 175.41 95.8Z"
          fill="#A3D8F4"
        />
        <path
          d="M135.62 220.4C135.62 244.93 115.63 264.92 91.1 264.92C66.57 264.92 46.58 244.93 46.58 220.4C46.58 195.87 66.57 175.88 91.1 175.88C115.63 175.88 135.62 195.87 135.62 220.4Z"
          fill="#F5A5E1"
        />
        <path
          d="M186.9 276.3C186.9 300.83 166.91 320.82 142.38 320.82C117.85 320.82 97.8599 300.83 97.8599 276.3C97.8599 251.77 117.85 231.78 142.38 231.78C166.91 231.78 186.9 251.77 186.9 276.3Z"
          fill="#C4FFB0"
        />
        {/*  */}
        <path
          d="M191.2 89.5C185.7 89.5 180.2 88.5 174.9 86.5C163.7 82.5 155.5 73.5 152.5 63.4C149.5 53.4 151.9 43.1 158.5 35.8C165.2 28.5 175.5 25.5 185.5 25.5C195.5 25.5 205.8 28.5 212.5 35.8C219.1 43.1 221.5 53.4 218.5 63.4C215.5 73.5 207.3 82.5 196.1 86.5C190.8 88.5 185.3 89.5 179.8 89.5H191.2Z"
          fill="#FA7C91"
        />
        <path
          d="M138 107C127.3 107 117.3 104.4 109.4 99.4C101.4 94.4 95.4 87.2 92.2 78.9C89 70.6 89.7 61.6 94.1 54.1C98.5 46.6 106 41.5 114.8 40.2C123.5 38.9 132.5 41.5 139.5 47.5C146.5 53.5 150.5 62.5 150.5 72.5C150.5 79.5 148.5 86.5 144.5 92.5C141.5 97.5 137.5 101 133 102.5C132.1 102.7 131.1 102.8 130.1 102.8H138Z"
          fill="#F8D37C"
        />
        {/* <path
          d="M200.004 400C233.267 400 263.831 387.318 285.874 366.012C307.917 344.707 320.605 314.306 320.605 281.089C320.605 247.871 307.917 217.47 285.874 196.165C263.831 174.859 233.267 162.177 200.004 162.177C166.74 162.177 136.177 174.859 114.134 196.165C92.0908 217.47 79.4023 247.871 79.4023 281.089C79.4023 314.306 92.0908 344.707 114.134 366.012C136.177 387.318 166.74 400 200.004 400Z"
          fill="#F9D8A7"
        /> */}
        <path
          d="M191.2 89.5C185.7 89.5 180.2 88.5 174.9 86.5C163.7 82.5 155.5 73.5 152.5 63.4C149.5 53.4 151.9 43.1 158.5 35.8C165.2 28.5 175.5 25.5 185.5 25.5C195.5 25.5 205.8 28.5 212.5 35.8C219.1 43.1 221.5 53.4 218.5 63.4C215.5 73.5 207.3 82.5 196.1 86.5C190.8 88.5 185.3 89.5 179.8 89.5H191.2Z"
          fill="#FA7C91"
        />
        <path
          d="M138 107C127.3 107 117.3 104.4 109.4 99.4C101.4 94.4 95.4 87.2 92.2 78.9C89 70.6 89.7 61.6 94.1 54.1C98.5 46.6 106 41.5 114.8 40.2C123.5 38.9 132.5 41.5 139.5 47.5C146.5 53.5 150.5 62.5 150.5 72.5C150.5 79.5 148.5 86.5 144.5 92.5C141.5 97.5 137.5 101 133 102.5C132.1 102.7 131.1 102.8 130.1 102.8H138Z"
          fill="#F8D37C"
        />
        {/* <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#ece9e9ea"
          fontSize="3rem"
          fontFamily="sans-serif"
        >
          Welcome!
        </text> */}
      </motion.svg>
    </div>
  );
};

export default WelcomePage;
