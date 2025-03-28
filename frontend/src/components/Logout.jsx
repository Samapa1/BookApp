import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Container } from "@mui/material";

import { logoutUser } from "../reducers/userReducer";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/");
    await dispatch(logoutUser());
  };

  return (
    <Container sx={{ marginLeft: 1 }}>
      <Typography variant="h6" sx={{ marginTop: 5, marginBottom: 5 }}>
        Log out from the application?
      </Typography>
      <Button variant="contained" color="success" onClick={handleLogout}>
        log out
      </Button>
    </Container>
  );
};

export default Logout;
