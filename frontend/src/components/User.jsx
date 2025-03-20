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
  Container,
} from "@mui/material";
import { getUserData } from "../reducers/userReducer";
import Loan from "./Loan";
import Reservation from "./Reservation";

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
      <Container sx={{ marginLeft: 1 }}>
        <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 3 }}>
          User
        </Typography>
        <Typography variant="body1">Name: {user.name}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
        <Link
          style={{ color: "#54A4A6", fontFamily: ["Futura", "sans-serif"] }}
          to="/userdata"
        >
          Change user details
        </Link>
        {user.loans.length > 0 ? (
          <TableContainer
            component={Paper}
            sx={{ marginTop: 4, marginBottom: 2 }}
          >
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
        ) : null}
        {user.reservations.length > 0 ? (
          <TableContainer component={Paper} sx={{ marginTop: 4 }}>
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
        ) : null}
        <br></br>
      </Container>
    );
  }
};

export default User;
