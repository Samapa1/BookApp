import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Container,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";

import { initializeBooks } from "./reducers/bookReducer";
import { getUserData } from "./reducers/userReducer";
import Booklist from "./components/BookList";
import Book from "./components/Book";
import User from "./components/User";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Registration from "./components/Registration";
import Notification from "./components/Notification";
import BookForm from "./components/BookForm";
import UserData from "./components/UserData";
import BookData from "./components/BookData";
import Loanlist from "./components/Loanlist";
import Userlist from "./components/Userlist";
import Reservationlist from "./components/Reservationlist";
import Ratinglist from "./components/Ratinglist";
import UserDataAdmin from "./components/UserDataAdmin";
import { theme } from "./theme";

const Home = ({ user }) => {
  let reservationsForCollection = false;

  if (user && user.reservations) {
    if (
      user.reservations.find((reservedBook) => reservedBook.available === true)
    ) {
      reservationsForCollection = true;
    }
  }

  return (
    <Container sx={{ marginLeft: 1 }}>
      <ThemeProvider theme={theme}>
        <Typography
          variant="h4"
          color="primary"
          sx={{ marginTop: 5, marginBottom: 5 }}
        >
          Welcome to the book app!
        </Typography>
        <Typography variant="body1" color="primary">
          Here you can borrow books and return your loans.
        </Typography>
        {reservationsForCollection ? (
          <Typography variant="body1" color="primary">
            You have reservations that are ready for collection. Please remember
            to borrow them at your own page!
          </Typography>
        ) : (
          ""
        )}
      </ThemeProvider>
    </Container>
  );
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBooks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const menu = {
    padding: 5,
    color: "white",
  };

  const hiddenMenu = {
    color: "#366169",
    fontFamily: ["Futura", "sans-serif"],
  };

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const user = useSelector((state) => state.user);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          sx={{ bgcolor: "#ffe8e8", minHeight: "100vh" }}
          maxWidth={false}
        >
          <Router>
            <Box sx={{ flexGrow: 1 }}>
              <AppBar sx={{ bgcolor: "#3c6d75" }} position="static">
                <Toolbar>
                  <Box
                    sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                  >
                    <IconButton
                      size="large"
                      aria-label="menu-appbar"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleOpenNavMenu}
                      color="inherit"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorElNav}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}
                      sx={{ display: { xs: "block", md: "none" } }}
                    >
                      {user ? (
                        <>
                          <MenuItem onClick={handleCloseNavMenu}>
                            <Link style={hiddenMenu} to="/user">
                              my page
                            </Link>
                          </MenuItem>
                        </>
                      ) : (
                        <></>
                      )}
                      <MenuItem key="books" onClick={handleCloseNavMenu}>
                        <Link style={hiddenMenu} to="/books">
                          books
                        </Link>
                      </MenuItem>
                      {user && user.admin ? (
                        <>
                          <MenuItem onClick={handleCloseNavMenu}>
                            <Link style={hiddenMenu} to="/loans">
                              loans
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={handleCloseNavMenu}>
                            <Link style={hiddenMenu} to="/reservations">
                              reservations
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={handleCloseNavMenu}>
                            <Link style={hiddenMenu} to="/ratings">
                              ratings
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={handleCloseNavMenu}>
                            <Link style={hiddenMenu} to="/users">
                              users
                            </Link>
                          </MenuItem>
                        </>
                      ) : (
                        <></>
                      )}
                      {user ? (
                        <>
                          <MenuItem onClick={handleCloseNavMenu}>
                            <Link style={hiddenMenu} to="/logout">
                              log out
                            </Link>
                          </MenuItem>
                        </>
                      ) : (
                        <>
                          <MenuItem onClick={handleCloseNavMenu}>
                            <Link style={hiddenMenu} to="/login">
                              log in
                            </Link>
                          </MenuItem>
                        </>
                      )}
                    </Menu>
                  </Box>
                  <Box
                    sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                  >
                    {user ? (
                      <>
                        <Button
                          onClick={handleCloseNavMenu}
                          sx={{ my: 2, color: "white", display: "block" }}
                        >
                          <Link style={menu} to="/user">
                            my page
                          </Link>
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      <Link style={menu} to="/books">
                        books
                      </Link>
                    </Button>
                    {user && user.admin ? (
                      <>
                        <Button
                          onClick={handleCloseNavMenu}
                          sx={{ my: 2, color: "white", display: "block" }}
                        >
                          <Link style={menu} to="/loans">
                            loans
                          </Link>
                        </Button>
                        <Button
                          onClick={handleCloseNavMenu}
                          sx={{ my: 2, color: "white", display: "block" }}
                        >
                          <Link style={menu} to="/reservations">
                            reservations
                          </Link>
                        </Button>
                        <Button
                          onClick={handleCloseNavMenu}
                          sx={{ my: 2, color: "white", display: "block" }}
                        >
                          <Link style={menu} to="/ratings">
                            ratings
                          </Link>
                        </Button>
                        <Button
                          onClick={handleCloseNavMenu}
                          sx={{ my: 2, color: "white", display: "block" }}
                        >
                          <Link style={menu} to="/users">
                            users
                          </Link>
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                    {user ? (
                      <>
                        <Button
                          onClick={handleCloseNavMenu}
                          sx={{
                            my: 2,
                            color: "white",
                            display: "block",
                          }}
                        >
                          <Link style={menu} to="/logout">
                            log out
                          </Link>
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        <Link style={menu} to="/login">
                          log in
                        </Link>
                      </Button>
                    )}
                  </Box>
                </Toolbar>
              </AppBar>
            </Box>
            <Notification></Notification>
            <Routes>
              <Route path="/books" element={<Booklist />} />
              <Route path="/books/:id" element={<Book />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/user" element={<User />} />
              <Route path="/userdata" element={<UserData />} />
              <Route path="/" element={<Home user={user} />} />
              <Route path="/addBook" element={<BookForm />} />
              <Route path="/bookdata/:id" element={<BookData />} />
              <Route path="/loans" element={<Loanlist />} />
              <Route path="/reservations" element={<Reservationlist />} />
              <Route path="/users" element={<Userlist />} />
              <Route path="/users/:id" element={<UserDataAdmin />} />
              <Route path="/ratings" element={<Ratinglist />} />
            </Routes>
          </Router>
        </Container>
        <Container
          sx={{
            bgcolor: "#ffe8e8",
            height: 20,
            paddingBottom: "70px",
          }}
          maxWidth={false}
        >
          <Box
            sx={{
              bgcolor: "#3c6d75",
              boxShadow: "0px -8px 4px -4px rgba(0, 0, 0, 0.2)",
              height: 15,
              paddingBottom: 7,
            }}
          >
            <Typography
              variant="body1"
              fontStyle="italic"
              color="white"
              sx={{ paddingTop: 3, paddingLeft: 5 }}
            >
              BookApp 2025
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
