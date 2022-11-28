import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CreateIcon from "@mui/icons-material/Create";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
/*
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";*/

import Popup from "reactjs-popup";

import Library from "./Library";
import Backlog from "./Backlog";

import Copyright from "./Copyright";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";

const mdTheme = createTheme({
  palette: {
    mode: "dark",
    type: "dark",
    primary: {
      main: "#1DB954",
      dark: "#1DB954",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff",
      disabled: "#ffffff",
      hint: "#ffffff",
    },
    secondary: {
      main: "#1DB954",
    },

    background: {
      default: "#191414",
      paper: "#191414",
    },
  },
});
//import DifficultySelect from "./DifficultySelect";

// Shortens username display
function excludeAt(s) {
  let newS = "";
  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) != "@") newS += s.charAt(i);
    else return newS;
  }
}

const drawerWidth = 240;

// Styling and theming from MUI
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Dashboard() {
  //const [habits, setHabits] = React.useState([]);
  //const [newHabit, setHabit] = React.useState("");
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [library, setLibrary] = React.useState([]);
  const [ratings, setRatings] = React.useState([]);

  const [userName, setUserName] = React.useState("Guest@");

  const [signupError, setSignupError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Update library with database
  const updateDatabase = async (newLibrary, newRatings) => {
    try {
      let thisDate = new Date().getTime();
      const docRef = await addDoc(collection(db, `${userName}`), {
        library: newLibrary,
        ratings: newRatings,
        date: thisDate,
      });
    } catch (e) {}
  };

  // Add to local and backend library
  function updateLibrary(song) {
    setLibrary((library) => [...library, song]);
    setRatings((ratings) => [...ratings, 0]);
    updateDatabase([...library, song], [...ratings, 0]);
  }

  React.useEffect(() => {
    // Set data with signed in user
    const fetchUser = async (newUser) => {
      let latestDate = 0;
      let latestData;
      let latestRatings;

      await getDocs(collection(db, `${newUser}`)).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().date > latestDate) {
            latestDate = doc.data().date;
            latestData = doc.data().library;
            latestRatings = doc.data().ratings;
            setLibrary(latestData);
            setRatings(latestRatings);
          }
        });
      });
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.email);
        fetchUser(user.email);
      } else {
        setUserName("Guest@");
        fetchUser("Guest@");
      }
    });

    // If loaded with small screen width, have smaller sidebar
    if (window.innerWidth < 760) setOpen(false);
  }, []);

  // Signup function
  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignupError("");
      })
      .catch((error) => {
        setSignupError("Invalid email, weak password, or user exists.");
      });

    window.location.reload(false);
  };

  // Signin function
  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        userName = email;
        window.location.reload(false);
      })
      .catch((error) => {});
  };

  // Logout function
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUserName("Guest@");
      })
      .catch((error) => {});
  };

  // Remove song from state
  const deleteSong = (i) => {
    setLibrary((library) => library.filter((library, n) => n !== i));
    setRatings((ratings) => ratings.filter((rating, n) => n !== i));
    updateDatabase(
      library.filter((library, n) => n !== i),
      ratings.filter((rating, n) => n !== i)
    );
  };

  function setRating(i, rating) {
    //let copy = ratings;
    //copy[i] = rating;
    //console.log(copy);
    setRatings(
      ratings.map((ratingAt, j) => {
        if (i == j) return rating;
        else return ratingAt;
      })
    );
    updateDatabase(
      library,
      ratings.map((ratingAt, j) => {
        if (i == j) return rating;
        else return ratingAt;
      })
    );
    //window.location.reload(false);
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
              backgroundColor: "#1DB954",
              color: "#191414",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <LibraryMusicIcon />
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1, marginLeft: "10px" }}
              >
                Rate My Music
              </Typography>
            </div>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <React.Fragment>
              <ListItemButton href="/">
                <ListItemIcon>
                  <QueueMusicIcon sx={{ color: "#1DB954" }} />
                </ListItemIcon>
                <ListItemText primary="Library" />
              </ListItemButton>
            </React.Fragment>
            <React.Fragment>
              <ListItemButton href="/search">
                <ListItemIcon>
                  <PlaylistAddIcon sx={{ color: "#1DB954" }} />
                </ListItemIcon>
                <ListItemText primary="Search Track" />
              </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
              <ListItemButton>
                <ListItemIcon>
                  <AccountBoxIcon sx={{ color: "#1DB954" }} />
                </ListItemIcon>
                <ListItemText primary={excludeAt(userName)} />
              </ListItemButton>
              <Popup
                trigger={
                  <ListItemButton>
                    <ListItemIcon>
                      <PersonAddIcon sx={{ color: "#1DB954" }} />
                    </ListItemIcon>
                    <ListItemText primary="Sign In" />
                  </ListItemButton>
                }
                position="right top"
              >
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <TextField
                      id="standard-basic"
                      label="Email"
                      variant="standard"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CardContent>
                  <CardContent sx={{ marginTop: "-20px" }}>
                    <TextField
                      id="standard-basic"
                      label="Password"
                      variant="standard"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={onLogin}>
                      Sign In
                    </Button>
                  </CardActions>
                </Card>
              </Popup>
              <Popup
                trigger={
                  <ListItemButton>
                    <ListItemIcon>
                      <CreateIcon sx={{ color: "#1DB954" }} />
                    </ListItemIcon>
                    <ListItemText primary="Sign Up" />
                  </ListItemButton>
                }
                position="right top"
              >
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <TextField
                      id="standard-basic"
                      label="Email"
                      variant="standard"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CardContent>
                  <CardContent sx={{ marginTop: "-20px" }}>
                    <TextField
                      id="standard-basic"
                      label="Password"
                      type="password"
                      variant="standard"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Typography
                      variant="body2"
                      color="red"
                      sx={{ marginTop: "10px" }}
                    >
                      {signupError}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={onSubmit}>
                      Sign Up
                    </Button>
                  </CardActions>
                </Card>
              </Popup>

              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: "#1DB954" }} />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItemButton>
            </React.Fragment>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Library
                    library={library}
                    ratings={ratings}
                    deleteFunction={deleteSong}
                    setRateFunction={setRating}
                  />
                }
              />
              <Route
                path="/search"
                element={<Backlog updateLibrary={updateLibrary} />}
              />
            </Routes>
          </BrowserRouter>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
