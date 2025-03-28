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

import { getRatings } from "../reducers/ratingReducer";
import { removeRating } from "../reducers/ratingReducer";
import { getUserData } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer.js";

const Ratinglist = () => {
  const dispatch = useDispatch();
  const ratings = useSelector((state) => state.ratings);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRatings());
  }, []);

  const handleRemoval = async (rating) => {
    console.log("deleting");
    if (
      window.confirm(
        `Remove ${rating.user.name}'s book ${rating.book.title} by ${rating.book.author}?`,
      )
    ) {
      console.log(rating.id);
      dispatch(removeRating(rating.id));
      dispatch(setNotification({ data: `Rating removed`, type: "info" }, 3000));
    }
  };

  return (
    <Container sx={{ marginLeft: 1, paddingBottom: 5 }}>
      <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 3 }}>
        Ratings
      </Typography>
      {ratings ? (
        <TableContainer
          component={Paper}
          sx={{ marginTop: 5, paddingLeft: 1, paddingRight: 1 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#3c6d75", fontWeight: "bold" }}>
                  Title
                </TableCell>
                <TableCell sx={{ color: "#3c6d75", fontWeight: "bold" }}>
                  Author
                </TableCell>
                <TableCell sx={{ color: "#3c6d75", fontWeight: "bold" }}>
                  Stars
                </TableCell>
                <TableCell sx={{ color: "#3c6d75", fontWeight: "bold" }}>
                  Rated by
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ratings.map((rating) => (
                <TableRow key={rating.id}>
                  <TableCell sx={{ color: "#3c6d75" }}>
                    {rating.book?.title}
                  </TableCell>
                  <TableCell sx={{ color: "#3c6d75" }}>
                    {rating.book?.author}
                  </TableCell>
                  <TableCell sx={{ color: "#3c6d75" }}>
                    {rating.stars}
                  </TableCell>
                  <TableCell sx={{ color: "#3c6d75" }}>
                    {rating.user?.name}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleRemoval(rating)}>
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

export default Ratinglist;
