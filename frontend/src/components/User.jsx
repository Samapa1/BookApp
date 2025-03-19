import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { getUserData } from "../reducers/userReducer";
import Loan from "./Loan";
import Reservation from "./Reservation";
// import { linkStyle2, Table } from "./Styles";
// import { linkStyle2 } from "./Styles";
import { theme } from "../theme";

const User = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const showLoans = () => {
    const borrowedBooks = user.loans.map((book) => (
      <Loan key={book.id} loan={book} />
    ));
    return borrowedBooks;
  };

  const showReservations = () => {
    const reservations = user.reservations.map((reservedBook) => (
      <Reservation key={reservedBook.id} reservation={reservedBook} />
    ));
    return reservations;
  };

  if (user) {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Typography
            variant="h4"
            color="primary"
            sx={{ marginTop: 5, marginBottom: 3, marginLeft: 3 }}
          >
            User
          </Typography>
          <Typography variant="body1" color="primary" sx={{ marginLeft: 3 }}>
            Name: {user.name}
          </Typography>
          <Typography variant="body1" color="primary" sx={{ marginLeft: 3 }}>
            Email: {user.email}
          </Typography>
          <Link style={{ color: "#54A4A6" }} to="/userdata">
            Change user details
          </Link>
          {user.loans.length > 0 ? (
            <div style={{ marginTop: 20, marginBottom: 20 }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#3c6d75", fontWeight: "bold" }}>
                        Borrowed book
                      </TableCell>
                      <TableCell sx={{ color: "#3c6d75", fontWeight: "bold" }}>
                        Due date
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  {showLoans()}
                </Table>
              </TableContainer>
            </div>
          ) : null}
          {user.reservations.length > 0 ? (
            <div style={{ marginTop: 40, marginBottom: 40 }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#3c6d75", fontWeight: "bold" }}>
                        Reserved book
                      </TableCell>
                      <TableCell sx={{ color: "#3c6d75", fontWeight: "bold" }}>
                        Due date
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  {showReservations()}
                </Table>
              </TableContainer>
              {/* <Table>{showReservations()}</Table> */}
            </div>
          ) : null}
        </ThemeProvider>
      </div>
    );
  }
};

export default User;
