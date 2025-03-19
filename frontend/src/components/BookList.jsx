import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { linkStyle1, linkStyle2 } from "./Styles";
import { Input } from "./Styles";
import {
  Table,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  TableBody,
  Paper,
  Typography,
} from "@mui/material";

const Booklist = () => {
  const user = useSelector((state) => state.user);
  const allBooks = useSelector((state) => state.books);
  const [filtered, setFilter] = useState("");
  const [fictionality, setFictionality] = useState("fiction");
  console.log(allBooks);

  const filterBooks = () => {
    return (
      <div>
        <label>
          <Typography variant="body1">filter books:</Typography>
          <Input
            value={filtered}
            onChange={({ target }) => setFilter(target.value)}
          />
        </label>
      </div>
    );
  };

  const radioFilter = () => {
    return (
      <div>
        <input
          id="fiction"
          type="radio"
          name="fictionality"
          onChange={() => setFictionality("fiction")}
          checked={fictionality === "fiction"}
        />
        <label htmlFor="fiction">fiction</label>
        <input
          id="nonfiction"
          type="radio"
          name="fictionality"
          onChange={() => setFictionality("nonfiction")}
          checked={fictionality === "nonfiction"}
        />
        <label htmlFor="nonfiction"> non-fiction</label>
      </div>
    );
  };

  const booksToShow = allBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(filtered.toLowerCase()) ||
      book.author.toLowerCase().includes(filtered.toLowerCase()),
  );

  return (
    <div>
      <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 3 }}>
        Books
      </Typography>
      {filterBooks()}
      {radioFilter()}
      <br></br>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#3c6d75", fontWeight: "bold" }}>
                Title
              </TableCell>
              <TableCell sx={{ color: "#3c6d75", fontWeight: "bold" }}>
                Author
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fictionality === "fiction"
              ? booksToShow
                  .filter(
                    (book) => book.class === "84.2" || book.class === "85",
                  )
                  .map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>
                        <Link style={linkStyle1} to={`/books/${book.id}`}>
                          {book.title}
                        </Link>
                      </TableCell>
                      <TableCell sx={{ color: "#3c6d75" }}>
                        {book.author}
                      </TableCell>
                    </TableRow>
                  ))
              : //     :
                //   }

                // ))
                booksToShow
                  .filter(
                    (book) => book.class !== "84.2" && book.class !== "85",
                  )
                  .map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>
                        <Link style={linkStyle1} to={`/books/${book.id}`}>
                          {book.title}
                        </Link>
                      </TableCell>
                      <TableCell sx={{ color: "#3c6d75" }}>
                        {book.author}
                      </TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      {user && user.admin ? (
        <Link style={linkStyle2} to={`/addBook`}>
          Add a book
        </Link>
      ) : null}
    </div>
  );
};

export default Booklist;
