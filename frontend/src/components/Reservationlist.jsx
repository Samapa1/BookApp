import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  TableBody,
  Paper,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { initializeReservations } from "../reducers/reservationReducer";
import { removeReservation } from "../reducers/reservationReducer";
import { getUserData } from "../reducers/userReducer";
import { formatDate } from "../../utils/helper.js";
import { setNotification } from "../reducers/notificationReducer.js";

const Reservationlist = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeReservations());
  }, []);

  const handleRemoval = async (reservation) => {
    if (
      window.confirm(
        `Remove ${reservation.user.name}'s book ${reservation.book.title} by ${reservation.book.author}?`,
      )
    ) {
      await dispatch(removeReservation(reservation.id));
      dispatch(
        setNotification({ data: `Reservation removed`, type: "info" }, 3000),
      );
    }
  };

  return (
    <Container sx={{ marginLeft: 1, paddingBottom: 5 }}>
      <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 3 }}>
        Reservations
      </Typography>
      {reservations.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{ marginTop: 5, paddingLeft: 1, paddingRight: 1 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#3c6d75", fontWeight: "bold" }}>
                  User
                </TableCell>
                <TableCell sx={{ color: "#3c6d75", fontWeight: "bold" }}>
                  Book
                </TableCell>
                <TableCell sx={{ color: "#3c6d75", fontWeight: "bold" }}>
                  Available
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.user?.name}</TableCell>
                  <TableCell>
                    {reservation.book?.title} by {reservation.book?.author}{" "}
                  </TableCell>
                  <TableCell>
                    {reservation.available
                      ? `due date: ${formatDate(reservation.dueDate)}`
                      : `not available`}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleRemoval(reservation)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Container>
  );
};

export default Reservationlist;
