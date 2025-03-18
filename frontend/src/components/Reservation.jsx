import { useDispatch } from "react-redux";
import { TableBody, TableCell, TableRow } from "@mui/material";

import { removeReservation } from "../reducers/reservationReducer";
import { getUserData } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer.js";
import { collectReservation } from "../reducers/reservationReducer";
import { Button } from "./Styles";
import { formatDate } from "../../utils/helper.js";

const Reservation = ({ reservation }) => {
  const dispatch = useDispatch();

  const remove = async (id) => {
    if (
      window.confirm(
        `Cancel book reservation (${reservation.book.title} by ${reservation.book.author})?`,
      )
    )
      await dispatch(removeReservation(id));
    await dispatch(getUserData());
  };

  const borrow = async () => {
    await dispatch(
      collectReservation({
        reservationId: reservation.id,
        userId: reservation.userId,
        bookId: reservation.bookId,
      }),
    );
    await dispatch(getUserData());
    await dispatch(
      setNotification(
        { data: `${reservation.book.title} borrowed`, type: "info" },
        3000,
      ),
    );
  };

  return (
    <TableBody>
      <TableRow>
        <TableCell sx={{ color: "#54a4a6" }}>
          {reservation.book.title} by {reservation.book.author}
        </TableCell>
        {reservation.available ? (
          <>
            <TableCell sx={{ color: "#54a4a6" }}>
              {formatDate(reservation.dueDate)}
            </TableCell>
            <TableCell>
              <Button onClick={() => remove(reservation.id)}> Cancel </Button>
            </TableCell>
            <TableCell>
              <Button onClick={() => borrow()}> Borrow </Button>
            </TableCell>
          </>
        ) : (
          <>
            <TableCell sx={{ color: "#54a4a6" }}>Not available</TableCell>
            <TableCell>
              <Button onClick={() => remove(reservation.id)}> Cancel </Button>
            </TableCell>
          </>
        )}
      </TableRow>
    </TableBody>
  );
};

export default Reservation;
