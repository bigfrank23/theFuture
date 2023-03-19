import React from 'react'
import { Box, Button, Divider, Paper, Typography } from '@mui/material'
import LockResetIcon from "@mui/icons-material/LockReset";
import { useFormik } from "formik";
import * as Yup from "yup";

const ForgotPassword = () => {
  //Form validation
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    // validateOnChange: false,
    // validateOnBlur: false,
    onSubmit: async (data) => {
      console.log(data);
    },
  });
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
          background: 'whitesmoke'
        }}
      >
        <Paper elevation={3}>
          <Box
            sx={{
              maxWidth: "400px",
              padding: "10px 0px 50px 50px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div>
              <div style={{ display: "flex", gap: "5px" }}>
                <LockResetIcon />
                <Typography component="h3" fontWeight={700} color="#333">
                  Password reset link will be sent to your email address
                </Typography>
              </div>
              <Divider />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "2rem",
                }}
              >
                <Box>
                  <Box
                    component="input"
                    type="email"
                    placeholder="Email"
                    name="email"
                    sx={{ padding: "10px", outline: 0, width: '100%' }}
                    border={formik.errors.email ? "thin solid red" : null}
                    onChange={formik.handleChange}
                  />
                </Box>
                <Typography variant="caption" color="red">
                  {formik.errors.email ? formik.errors.email : null}
                </Typography>
              </div>
            </div>
            <div>
              <Button color="secondary" size="small" variant="contained">
                Submit
              </Button>
            </div>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default ForgotPassword