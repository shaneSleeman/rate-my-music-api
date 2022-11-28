import { Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Copyright from "./Copyright";

const Library = ({ library }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {}
        <Grid item xs={12}>
          {library.map((song, i) => (
            <Paper>
              <Typography>{song.name}</Typography>
            </Paper>
          ))}
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
};

export default Library;
