import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Container, Typography } from "@mui/material";
import { addBook } from "../reducers/bookReducer";
import { setNotification } from "../reducers/notificationReducer.js";
import FormField from "./FormField.jsx";
import BookRadioFilter from "./BookRadioFilter.jsx";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [items, setItems] = useState("");
  const [language, setLanguage] = useState("");
  const [libraryClass, setClass] = useState("");
  const [genre, setGenre] = useState("");
  const [subjects, setSubjects] = useState("");
  const [fictionality, setFictionality] = useState("fiction");

  const dispatch = useDispatch();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const bookObject = {
        title: title,
        author: author,
        year: Number(year),
        language: language,
        class: libraryClass,
        genre: genre,
        subjects: subjects,
        numberOfBooks: items,
      };
      await dispatch(addBook(bookObject));
      setTitle("");
      setAuthor("");
      setLanguage("");
      setYear("");
      setItems("");
      setClass("");
      setGenre("");
      setSubjects("");
      setFictionality("fiction");
      await dispatch(
        setNotification(
          {
            data: `${bookObject.title} by ${bookObject.author} added`,
            type: "info",
          },
          3000,
        ),
      );
    } catch (exception) {
      console.log("something went wrong");
      console.log(exception);
      await dispatch(
        setNotification(
          // { data: `${exception.response.data.error}`, type: "error" },
          { data: `${exception.message}`, type: "error" },
          3000,
        ),
      );
    }
  };

  return (
    <Container sx={{ marginLeft: 1, paddingBottom: 5 }}>
      <Typography variant="h5" sx={{ marginBottom: 3, marginTop: 5 }}>
        Add a book to the database
      </Typography>
      <BookRadioFilter
        fictionality={fictionality}
        setFictionality={setFictionality}
      />
      <form onSubmit={handleForm}>
        <FormField field={title} fieldLabel={"Title"} setField={setTitle} />
        <FormField field={author} fieldLabel={"Author"} setField={setAuthor} />
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
        ) : (
          <FormField
            field={subjects}
            fieldLabel={"Subjects"}
            setField={setSubjects}
          />
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: 2, marginBottom: 5 }}
        >
          Save changes
        </Button>
      </form>
    </Container>
  );
};

export default BookForm;
