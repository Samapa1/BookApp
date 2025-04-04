import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Container, AppBar, Box, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

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
import Home from "./components/Home";
import TopBar from "./components/Topbar";
import { theme } from "./theme";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBooks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

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
                <TopBar user={user} />
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
