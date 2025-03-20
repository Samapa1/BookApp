import { Typography } from "@mui/material";

const BasicBookData = ({ book }) => {
  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: 5, marginTop: 5 }}>
        {book.title}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Author: {book.author}
      </Typography>
      <Typography variant="body1">Year: {book.year}</Typography>
      <Typography variant="body1">Language: {book.language}</Typography>
      <Typography variant="body1">Class: {book.class}</Typography>
      <Typography variant="body1" sx={{ marginBottom: 3 }}>
        {book.genre ? `Genre: ${book.genre}` : `Subjects: ${book.subjects}`}
      </Typography>
    </>
  );
};

export default BasicBookData;
