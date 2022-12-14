import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Copyright from "./Copyright";
import DeleteIcon from "@mui/icons-material/Delete";

const Library = ({ library, deleteFunction, ratings, setRateFunction }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {library.map((suggestion, i) => (
          <Grid item xs={12} md={6} lg={4}>
            <Card
              sx={{
                display: "flex",
                backgroundColor: "black",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto", width: 200 }}>
                  <Typography
                    component="div"
                    variant="h6"
                    sx={{
                      height: "60px",
                      overflow: "hidden",
                    }}
                  >
                    {suggestion.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    sx={{ height: "20px" }}
                  >
                    {suggestion.artists[0].name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    component="div"
                    sx={{
                      height: "40px",
                      marginTop: "5px",
                      overflow: "hidden",
                    }}
                  >
                    {suggestion.album.name}
                  </Typography>
                </CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  <IconButton aria-label="play/pause">
                    <DeleteIcon
                      onClick={() => {
                        deleteFunction(i);
                      }}
                      sx={{ height: 38, width: 38 }}
                    />
                  </IconButton>
                  <Rating
                    name="simple-controlled"
                    value={ratings[i]}
                    onChange={(event, newValue) => {
                      setRateFunction(i, newValue);
                    }}
                  />
                </Box>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 169, height: 169, paddingRight: "20px" }}
                image={suggestion.thumbnail}
                alt="API does not have this track's album cover."
              />
            </Card>
          </Grid>
        ))}
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
};

export default Library;
