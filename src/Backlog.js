import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import Copyright from "./Copyright";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import AddIcon from "@mui/icons-material/Add";

const Backlog = ({ updateLibrary }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  function searchSong(search) {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "e0669a5601msh0fa777c28b105efp1c77b3jsnc15800160ba6",
        "X-RapidAPI-Host": "youtube-music1.p.rapidapi.com",
      },
    };

    fetch(
      "https://youtube-music1.p.rapidapi.com/v2/search?query=" + search,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.ok == true) {
          setSuggestions(response.result.songs);
        }
        //
      })
      .catch((err) => console.error(err));
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  searchSong(query);
                }
              }}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Track..."
              inputProps={{ "aria-label": "search google maps" }}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={() => {
                searchSong(query);
              }}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid spacing={5} xs={4} md={6} lg={4}>
          {suggestions.map((suggestion, i) => (
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
                    <AddIcon
                      onClick={() => {
                        updateLibrary(suggestion);
                      }}
                      sx={{ height: 38, width: 38 }}
                    />
                  </IconButton>
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

export default Backlog;
