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

  const removeFromSuggestions = (i) => {
    setSuggestions((suggestions) =>
      suggestions.filter((suggestion, n) => n !== i)
    );
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} justifyContent="center" alignItems="center">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
              backgroundColor: "black",
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

        <Grid item container spacing={3}>
          {suggestions.map((suggestion, i) => (
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
                      sx={{ height: "40px", marginTop: "5px" }}
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
                          removeFromSuggestions(i);
                        }}
                        sx={{ height: 38, width: 38 }}
                      />
                    </IconButton>
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
      </Grid>

      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
};

export default Backlog;
