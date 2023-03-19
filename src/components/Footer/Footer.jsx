import React from 'react'
import { Box, Button, Typography, Input, TextField } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from 'react-router-dom'
import './footer.css'

const Footer = () => {
  return (
    <>
    <Box sx={{padding: {xs: '3rem 24px', sm: '3rem 24px', md: '3rem 6rem', lg:"3rem 6rem"}, background: 'azure', marginTop: '2rem'}}>
      <Box component="footer" sx={{ display: {xs: 'block', sm: 'block', md: 'flex', lg: 'flex'}, alignItems: "center"}} >

        {/* left */}
        <Box sx={{flex: 2, display: "flex", gap: {xs: '2rem', sm: '2rem', md: '4rem', lg:'4rem'}, justifyContent: {xs: 'center', sm: 'center', md: 'unset', lg: 'unset'}}}>
          <Box>
            <Typography component="h6" variant="h6" fontWeight={700}>
              Support
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <Box component="li">
                <Link className="footer-links" to='/#'>
                  <Typography>lorem</Typography>
                </Link>
              </Box>
              <Box component="li">
                <Link className="footer-links" to='/#'>
                  <Typography>lorem</Typography>
                </Link>
              </Box>
              <Box component="li">
                <Link className="footer-links" to='/#'>
                  <Typography>lorem</Typography>
                </Link>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography component="h6" variant="h6" fontWeight={700}>
              Support
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <Box component="li">
                <Link className="footer-links" to='/#'>
                  <Typography>lorem</Typography>
                </Link>
              </Box>
              <Box component="li">
                <Link className="footer-links" to='/#'>
                  <Typography>lorem</Typography>
                </Link>
              </Box>
              <Box component="li">
                <Link className="footer-links" to='/#'>
                  <Typography>lorem</Typography>
                </Link>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography component="h6" variant="h6" fontWeight={700}>
              Support
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <Box component="li">
                <Link className="footer-links" to='/#'>
                  <Typography>lorem</Typography>
                </Link>
              </Box>
              <Box component="li">
                <Link className="footer-links" to='/#'>
                  <Typography>lorem</Typography>
                </Link>
              </Box>
              <Box component="li">
                <Link className="footer-links" to='/#'>
                  <Typography>lorem</Typography>
                </Link>
              </Box>
            </Box>
          </Box>

        </Box>

        {/* Right */}
        <Box sx={{flex1: 1, display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: {xs: '2rem', sm: '2rem', md: 'unset', lg: 'unset'}, textAlign: {xs: 'center', sm: 'center', md: 'unset', lg: 'unset'}}}>
          <Typography component="h6" variant="h6" fontWeight={700}>
            Subscribe to our newsletter
          </Typography>
          <Typography component="p" variant="subtitle2" color='#555'>
            The latest news, articles, and resources sent to your inbox weekly
          </Typography>
          <Box component="div" sx={{ display: "flex", gap: "1rem", justifyContent: {xs: 'center', sm: 'center', md: 'unset', lg: 'unset'} }}>
            <TextField id="outlined-basic" label='email' variant="outlined" />
            <Button variant="contained" color="primary">
              subscribe
            </Button>
          </Box>
        </Box>
      </Box>
      <Box component='hr' sx={{borderTop: '1px solid #eee', my: '2rem'}} />
      <Box sx={{display: 'flex', flexDirection: {xs: 'column-reverse', sm: 'column-reverse', md: 'unset', lg: 'unset'}, justifyContent: 'space-between', gap: {xs: '1rem', sm: '1rem'}}}>
        <Typography component='p' variant='subtitle2' color='#555' sx={{textAlign: {xs: 'center', sm: 'center'}}}>&copy; copyright Franklin 2023</Typography>
        <Box sx={{display: 'flex', gap: '1rem', alignItems: 'center', color: '#555', justifyContent: {xs: 'center', sm: 'center', md: 'unset', lg: 'unset'}}}>
            <TwitterIcon/>
            <InstagramIcon/>
            <LinkedInIcon/>
            <YouTubeIcon/>
            <WhatsAppIcon/>
        </Box>
      </Box>
      </Box>
    </>
  );
}

export default Footer