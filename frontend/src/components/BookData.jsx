import { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Typography } from "@mui/material";

import { updateBook } from "../reducers/bookReducer";
import { removeBook } from "../reducers/bookReducer";
import FormField from "./FormField";
import { setNotification } from "../reducers/notificationReducer";
import BookRadioFilter from "./BookRadioFilter.jsx";

const BookData = () => {
  const id = useParams().id;
  const allBooks = useSelector((state) => state.books);
  const book = allBooks.find((book) => book.id === Number(id));
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [items, setItems] = useState("");
  const [year, setYear] = useState("");
  const [language, setLanguage] = useState("");
  const [libraryClass, setClass] = useState("");
  const [genre, setGenre] = useState("");
  const [subjects, setSubjects] = useState("");
  const [fictionality, setFictionality] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initializeBookData = useCallback(async () => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setItems(book.numberOfBooks);
      setYear(book.year);
      setLanguage(book.language);
      setClass(book.class);
      book.genre ? (setFictionality("fiction"), setGenre(book.genre)) : null;
      book.subjects
        ? (setSubjects(book.subjects), setFictionality("non-fiction"))
        : null;
    }
  }, [book]);

  useEffect(() => {
    initializeBookData();
  }, [initializeBookData]);

  const handleChanges = async (event) => {
    event.preventDefault();
    console.log("changing book details");

    try {
      await dispatch(
        updateBook({
          ...book,
          title: title,
          author: author,
          year: year,
          language: language,
          class: libraryClass,
          genre: genre,
          subjects: subjects,
          numberOfBooks: items,
        }),
      );
      await dispatch(
        setNotification(
          { data: `Changes saved succesfully`, type: "info" },
          3000,
        ),
      );
    } catch (exception) {
      await dispatch(
        setNotification(
          { data: `${exception.response.data.error}`, type: "error" },
          3000,
        ),
      );
    }
  };

  const handleDelete = async () => {
    console.log("deleting");
    if (window.confirm(`Remove ${book.title} by ${book.author} permanently?`)) {
      try {
        navigate("/books");
        await dispatch(removeBook(book.id));
        await dispatch(
          setNotification({ data: `Book deleted`, type: "info" }, 3000),
        );
      } catch (exception) {
        await dispatch(
          setNotification(
            { data: `${exception.response.data.error}`, type: "error" },
            3000,
          ),
        );
      }
    }
  };

  console.log(fictionality);
  console.log(genre);

  if (book) {
    return (
      <Container sx={{ marginLeft: 1, paddingBottom: 5 }}>
        <Typography variant="h5" sx={{ marginBottom: 3, marginTop: 5 }}>
          Change book details
        </Typography>
        <BookRadioFilter
          fictionality={fictionality}
          setFictionality={setFictionality}
        />
        <form onSubmit={handleChanges}>
          <FormField field={title} fieldLabel={"Title"} setField={setTitle} />
          <FormField
            field={author}
            fieldLabel={"Author"}
            setField={setAuthor}
          />
          <FormField field={year} fieldLabel={"Year"} setField={setYear} />
          <FormField
            field={language}
            fieldLabel={"Language"}
            setField={setLanguage}
          />
          <FormField
            field={libraryClass}
            fieldLabel={"Class"}
            setField={setClass}
          />
          <FormField
            field={items}
            fieldLabel={"Number of books"}
            setField={setItems}
          />
          {fictionality === "fiction" ? (
            <FormField field={genre} fieldLabel={"Genre"} setField={setGenre} />
          ) : null}
          {fictionality === "non-fiction" ? (
            <FormField
              field={subjects}
              fieldLabel={"Subjects"}
              setField={setSubjects}
            />
          ) : null}
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: 2, marginBottom: 5 }}
          >
            Save changes
          </Button>
        </form>
        <Typography variant="body1">
          Remove the book from the database?
        </Typography>
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={handleDelete}
        >
          Delete book
        </Button>
      </Container>
    );
  }
};

export default BookData;
