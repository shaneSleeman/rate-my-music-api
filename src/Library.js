import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Copyright from "./Copyright";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { SecurityUpdateWarning } from "@mui/icons-material";

const Library = ({ library, deleteFunction, ratings, setRateFunction }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {}
        <Grid item xs={12}>
          {library.map((suggestion, i) => (
            <Card sx={{ display: "flex" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto", width: 200 }}>
                  <Typography component="div" variant="h5">
                    {suggestion.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {suggestion.artists[0].name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
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
                      //window.location.reload(false);
                    }}
                  />
                </Box>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 200, height: 200 }}
                image={suggestion.thumbnail}
                alt="Album cover not found."
              />
            </Card>
          ))}
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
};

export default Library;
