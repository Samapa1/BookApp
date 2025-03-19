import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  Container,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

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
// import { Page, NavBar, UpperBar, Footer } from "./components/Styles";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#366169",
//     },
//     secondary: {
//       main: "#54a4a6",
//     },
//   },
//   typography: {
//     fontFamily: ["Futura", "sans-serif"],
//     fontSize: 14,
//     color: "#366169",
//   },
// });

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
    <div>
      <ThemeProvider theme={theme}>
        <Typography
          variant="h4"
          color="primary"
          sx={{ marginTop: 5, marginBottom: 5, marginLeft: 3 }}
        >
          Welcome to the book app
        </Typography>
        <Typography variant="body1" color="primary" sx={{ marginLeft: 3 }}>
          Here you can borrow books and return your loans.
        </Typography>
        {reservationsForCollection ? (
          <Typography variant="body1" color="primary" sx={{ marginLeft: 3 }}>
            You have reservations that are ready for collection. Please remember
            to borrow them at your own page!
          </Typography>
        ) : (
          ""
        )}
      </ThemeProvider>
    </div>
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

  const padding = {
    padding: 5,
    color: "white",
  };

  const user = useSelector((state) => state.user);

  return (
    <Container sx={{ bgcolor: "#ffe8e8", minHeight: "100vh" }} maxWidth={false}>
      <ThemeProvider theme={theme}>
        <Router>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ bgcolor: "#3c6d75" }} position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link style={padding} to="/">
                    home
                  </Link>
                  {user ? (
                    <>
                      {" "}
                      <Link style={padding} to="/user">
                        my page
                      </Link>
                    </>
                  ) : (
                    <></>
                  )}
                  <Link style={padding} to="/books">
                    books
                  </Link>
                  {user && user.admin ? (
                    <>
                      {" "}
                      <Link style={padding} to="/loans">
                        loans
                      </Link>
                      <Link style={padding} to="/reservations">
                        reservations
                      </Link>
                      <Link style={padding} to="/ratings">
                        ratings
                      </Link>
                      <Link style={padding} to="/users">
                        users
                      </Link>
                    </>
                  ) : (
                    <></>
                  )}
                </Typography>
                <Button color="inherit">
                  {user ? (
                    <>
                      <Link style={padding} to="/logout">
                        log out
                      </Link>
                    </>
                  ) : (
                    <Link style={padding} to="/login">
                      log in
                    </Link>
                  )}
                </Button>
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
        {/* <Footer>
            <em>Book app 2024</em>
          </Footer> */}
        {/* </Page> */}
      </ThemeProvider>
    </Container>
  );
};

export default App;
