import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableBody,
  Paper,
  Typography,
  Container,
} from "@mui/material";
import { initializeUsers } from "../reducers/usersReducer.js";
import { getUserData } from "../reducers/userReducer.js";

const Userlist = () => {
  const dispatch = useDispatch();
  const adminUser = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const userlist = useSelector((state) => state.users);

  return (
    <Container sx={{ marginLeft: 1, paddingBottom: 5 }}>
      <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 3 }}>
        Users
      </Typography>
      {userlist ? (
        <TableContainer
          component={Paper}
          sx={{ marginTop: 5, paddingLeft: 1, paddingRight: 1 }}
        >
          <Table>
            <TableBody>
              {userlist
                .filter((user) => user.id !== adminUser.id)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Link
                        style={{
                          color: "#54A4A6",
                          fontFamily: ["Futura", "sans-serif"],
                        }}
                        to={`/users/${user.id}`}
                      >
                        {user.name}
                      </Link>
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

export default Userlist;
