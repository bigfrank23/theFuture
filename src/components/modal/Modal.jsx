import React from "react";
import { Box, Button, Pagination, Stack, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import authorImg from '../../images/user.png'
import './modal.css'
import { motion, AnimatePresence } from 'framer-motion';

const DrawerModal = ({ isOpen, onClose }) => {
  const items = [1,2,3]
  return (
      // <AnimatePresence>
      // {isOpen && (
      //   <motion.div
      //     initial={{ y: "100%" }}
      //     animate={{ y: 0 }}
      //     transition={{ duration: 0.3 }}
      //     exit={{ y: "100%" }}
      //   >
      <div className={`drawer-modal-container ${isOpen ? "open" : ""}`}>
        <div className={`drawer-modal ${isOpen ? "open" : ""}`}>
          {/* Your modal content goes here */}
          <Box sx={{ padding: "1.5rem" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <CancelIcon
                sx={{ fill: "red", cursor: "pointer" }}
                onClick={onClose}
              />
            </Box>
            {items.map((item) => (
              <Box
                sx={{
                  background: "ghostwhite",
                  padding: "1rem",
                  borderRadius: "5px",
                  marginTop: "1rem",
                  boxShadow: "0 0 2px 1px #ccc",
                }}
              >
                <Box sx={{ display: "flex", gap: "2.5rem" }}>
                  <Box
                    component="img"
                    src={authorImg}
                    alt=""
                    loading="lazy"
                    sx={{ width: "40px", height: "40px", borderRadius: "50%" }}
                  />
                  <Button variant="outlined" size="small">
                    Follow
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    marginTop: "10px",
                  }}
                >
                  <Typography
                    component="span"
                    variant="subtitle2"
                    color="#918a8a"
                  >
                    Rita Lope
                  </Typography>
                  <Typography component="span" variant="caption" color="#918a8a">
                    user's job title, here erhe here herehere
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          {/* Pagination */}
          <Box sx={{ padding: "1rem" }}>
            <Stack spacing={2}>
              <Pagination
                showFirstButton
                showLastButton
                count={10}
                color="primary"
                variant="outlined"
              />
            </Stack>
          </Box>
        </div>
      </div>
    // </motion.div>
    //   )}
    // </AnimatePresence>
  );
};

export default DrawerModal
