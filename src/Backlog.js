import React, { useState } from "react";
import { Grid, IconButton, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Copyright from "./Copyright";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

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
        {suggestions.map((suggestion, i) => (
          <Paper>
            <Typography
              onClick={() => {
                updateLibrary(suggestion);
              }}
            >
              {suggestion.name}
            </Typography>
          </Paper>
        ))}
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
};

export default Backlog;
