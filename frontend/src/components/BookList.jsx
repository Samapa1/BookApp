import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { linkStyle1, linkStyle2 } from "./Styles";
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
  RadioGroup,
  FormControlLabel,
  FormControl,
  Radio,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const Booklist = () => {
  const user = useSelector((state) => state.user);
  const allBooks = useSelector((state) => state.books);
  const [filtered, setFilter] = useState("");
  const [fictionality, setFictionality] = useState("fiction");

  const filterBooks = () => {
    return (
      <FormControl sx={{ width: "30ch", marginBottom: 2 }} variant="outlined">
        <TextField
          id="outlined-controlled"
          label="Search"
          value={filtered}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          onChange={({ target }) => setFilter(target.value)}
        />
      </FormControl>
    );
  };

  const radioFilter = () => {
    const handleFictionality = (event) => {
      setFictionality(event.target.value);
    };
    return (
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={fictionality}
          onChange={handleFictionality}
        >
          <FormControlLabel
            value="fiction"
            control={<Radio />}
            label="fiction"
          />
          <FormControlLabel
            value="non-fiction"
            control={<Radio />}
            label="non-fiction"
          />
        </RadioGroup>
      </FormControl>
    );
  };

  const booksToShow = allBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(filtered.toLowerCase()) ||
      book.author.toLowerCase().includes(filtered.toLowerCase()),
  );

  return (
    <Container sx={{ marginLeft: 1, paddingBottom: 5 }}>
      <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 3 }}>
        Books
      </Typography>
      {filterBooks()}
      <br />
      {radioFilter()}
      <TableContainer component={Paper} sx={{ marginTop: 5 }}>
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
              : booksToShow
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
    </Container>
  );
};

export default Booklist;
