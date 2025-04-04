import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Typography, Container, Button } from "@mui/material";

import { addLoan } from "../reducers/loanReducer.js";
import { addReservation } from "../reducers/reservationReducer.js";
import { getUserData } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer.js";
import statusService from "../services/status";
import StarRating from "./StarRating";
import StarBar from "./StarBar";
import BasicBookData from "./BasicBookData.jsx";
import { linkStyle } from "./Styles.jsx";

const Book = () => {
  const id = useParams().id;

  const [available, setAvailability] = useState(null);
  const [borrowed, setBorrowed] = useState(null);
  const [reserved, setReserved] = useState(null);
  const [numberOfReservations, setNumberOfReservations] = useState(null);
  const allBooks = useSelector((state) => state.books);
  const book = allBooks.find((book) => book.id === Number(id));
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [borrowed, reserved, dispatch]);

  useEffect(() => {
    const checkAvailability = async () => {
      if (book) {
        const bookStatus = await statusService.getStatus(book.id);
        setNumberOfReservations(bookStatus.reservations);
        if (bookStatus.status === "available") {
          setAvailability(true);
        } else {
          setAvailability(false);
        }
      }
    };
    checkAvailability();
  }, [book, user, dispatch]);

  useEffect(() => {
    if (user && user.loans) {
      if (user.loans.find((userbook) => userbook.book.title === book.title)) {
        setBorrowed(true);
      } else {
        setBorrowed(false);
      }
    }
  }, [book, user]);

  useEffect(() => {
    if (user && user.reservations) {
      if (
        user.reservations.find(
          (reservedBook) => reservedBook.bookId === book.id,
        )
      ) {
        setReserved(true);
      } else {
        setReserved(false);
      }
    }
  }, [book, user]);

  const borrow = async () => {
    await dispatch(
      addLoan({
        userId: user.id,
        bookId: book.id,
      }),
    );
    await dispatch(getUserData());
    await dispatch(
      setNotification({ data: `${book.title} borrowed`, type: "info" }, 3000),
    );
  };

  const reserve = async () => {
    await dispatch(
      addReservation({
        user: user,
        book: book,
      }),
    );
    await dispatch(getUserData());
    await dispatch(
      setNotification({ data: `${book.title} reserved`, type: "info" }, 3000),
    );
  };

  if (book && user && (available === true || available === false)) {
    return (
      <Container sx={{ marginLeft: 1, paddingBottom: 5 }}>
        <BasicBookData book={book} />
        {!borrowed && available && !reserved ? (
          <Button
            variant="contained"
            color="primary"
            sx={{ marginBottom: 2 }}
            onClick={borrow}
          >
            Borrow
          </Button>
        ) : null}
        {borrowed ? (
          <Typography variant="body1" sx={{ marginTop: 2, marginBottom: 3 }}>
            You have borrowed the book.
          </Typography>
        ) : null}
        <Typography variant="body1" sx={{ marginTop: 2, marginBottom: 3 }}>
          Reservations: {numberOfReservations}
        </Typography>
        {reserved ? (
          <Typography variant="body1" sx={{ marginTop: 2, marginBottom: 3 }}>
            You have reserved the book.
          </Typography>
        ) : null}
        {!available && !borrowed && !reserved ? (
          <Button
            variant="contained"
            color="primary"
            sx={{ marginBottom: 2 }}
            onClick={reserve}
          >
            Reserve
          </Button>
        ) : null}
        <Typography variant="body1">Your rating:</Typography>
        <StarRating id={book.id} />
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          Average: {book.rating.toFixed(2)}
        </Typography>
        <br />
        {user && user.admin ? (
          <>
            <br></br>
            <Link style={linkStyle} to={`/bookdata/${book.id}`}>
              Change book details or delete it from the database.
            </Link>
          </>
        ) : (
          <></>
        )}
      </Container>
    );
  }
  if (book && (available === true || available === false)) {
    return (
      <Container>
        <BasicBookData book={book} />
        {available ? (
          <Typography variant="body1" sx={{ marginTop: 2, marginBottom: 2 }}>
            The book is available.
          </Typography>
        ) : (
          <Typography variant="body1" sx={{ marginTop: 2, marginBottom: 2 }}>
            The book is not available (all items are borrowed).
          </Typography>
        )}
        <Typography variant="body1">Rating</Typography>
        <StarBar book={book} />
        {available ? (
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Please log in to borrow or rate the book.
          </Typography>
        ) : (
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Please log in to reserve or rate the book.
          </Typography>
        )}
        <br />
      </Container>
    );
  } else {
    return null;
  }
};

export default Book;
