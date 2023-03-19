import React from 'react'
import { Avatar, Box, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Divider, Grid, Pagination, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import VisibilityIcon from "@mui/icons-material/Visibility";
import profileImg from "../../images/profile4.jpg";

const LivePage = () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      {/* Live Grid */}
      <Box component="section" sx={{ padding: "0 24px", marginTop: "5rem" }}>
        <Box>
          {/* <ArticleOutlinedIcon sx={{ alignSelf: "center" }} /> */}
          <Typography
            component="h3"
            variant="h6"
            sx={{ fontWeight: 600, textAlign: "center" }}
          >
            Live Stream Page
          </Typography>
        </Box>
        <Divider sx={{ marginBottom: "2.3rem", marginTop: '10px' }} />
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{ maxWidth: 345, margin: "auto" }}
                component={Link}
                // to="/post"
                className="posts-links"
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={profileImg}
                    alt="green iguana"
                    sx={{ borderRadius: "50%", width: "140px", margin: "auto" }}
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <CardHeader
                      title="Franklin Ezeyim"
                      subheader="This is the topics to be discussed"
                    />
                    <CardActions
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Box>
                        <VisibilityIcon sx={{ fontSize: ".875rem" }} />
                        <span>4k</span>
                      </Box>
                    </CardActions>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Pagination 2 */}
      <Box
        component="section"
        sx={{
          padding: "0 24px",
          marginTop: "5rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={10}
            showFirstButton
            showLastButton
            color="primary"
            variant="outlined"
          />
        </Stack>
      </Box>
    </>
  );
}

export default LivePage