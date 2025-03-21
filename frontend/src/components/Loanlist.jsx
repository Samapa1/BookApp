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
import { initializeLoans } from "../reducers/loanReducer.js";
import { removeLoan } from "../reducers/loanReducer";
import { getUserData } from "../reducers/userReducer.js";
import { setNotification } from "../reducers/notificationReducer.js";
import { formatDate } from "../../utils/helper.js";

const Loanlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeLoans());
  }, [dispatch]);

  const loanList = useSelector((state) => state.loans);

  const returnLoan = async (loan) => {
    if (
      window.confirm(
        `Return ${loan.user.name}'s book ${loan.book.title} by ${loan.book.author}?`,
      )
    ) {
      await dispatch(removeLoan(loan.id));
      await dispatch(
        setNotification(
          { data: `${loan.book.title} returned`, type: "info" },
          3000,
        ),
      );
    }
  };

  const isLate = (duedate) => {
    const date = new Date();
    if (Date.parse(duedate) < date) {
      return <div>late</div>;
    } else {
      return <div>ok</div>;
    }
  };
  return (
    <Container sx={{ marginLeft: 1, paddingBottom: 5 }}>
      <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 3 }}>
        Loans
      </Typography>
      {loanList.length > 0 ? (
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
                  Due date
                </TableCell>
                <TableCell sx={{ color: "#3c6d75", fontWeight: "bold" }}>
                  Status
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loanList.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell>{loan.user?.name}</TableCell>
                  <TableCell>{loan.book?.title}</TableCell>
                  <TableCell>{formatDate(loan.dueDate)}</TableCell>
                  <TableCell>{isLate(loan.dueDate)}</TableCell>
                  <TableCell>
                    <Button onClick={() => returnLoan(loan)}>Return</Button>
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

export default Loanlist;
