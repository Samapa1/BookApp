import { useDispatch } from "react-redux";
import { TableBody, TableCell, TableRow } from "@mui/material";

import { removeLoan } from "../reducers/loanReducer";
import { renewLoan } from "../reducers/loanReducer";
import { getUserData } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer.js";
import { Button } from "./Styles";
import { formatDate } from "../../utils/helper.js";

const Loan = ({ loan }) => {
  const dispatch = useDispatch();

  const returnBook = async (id) => {
    if (
      window.confirm(`Return book ${loan.book.title} by ${loan.book.author}?`)
    ) {
      await dispatch(removeLoan(id));
      await dispatch(getUserData());
      await dispatch(
        setNotification(
          { data: `${loan.book.title} returned`, type: "info" },
          3000,
        ),
      );
    }
  };

  const renewCurrentLoan = async (id) => {
    try {
      await dispatch(renewLoan(id));
      await dispatch(getUserData());
      await dispatch(
        setNotification(
          { data: `${loan.book.title} loan renewed`, type: "info" },
          3000,
        ),
      );
    } catch (exception) {
      console.log(exception);
      await dispatch(
        setNotification(
          { data: `${loan.book.title} is reserved!`, type: "error" },
          3000,
        ),
      );
    }
  };

  return (
    <TableBody>
      <TableRow>
        <TableCell sx={{ color: "#54a4a6" }}>
          {loan.book.title} by {loan.book.author}
        </TableCell>
        <TableCell sx={{ color: "#54a4a6" }}>
          {formatDate(loan.dueDate)}
        </TableCell>
        <TableCell>
          <Button onClick={() => returnBook(loan.id)}>Return</Button>
        </TableCell>
        <TableCell>
          <Button onClick={() => renewCurrentLoan(loan.id)}>Renew</Button>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default Loan;
