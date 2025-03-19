import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
// import { Button } from "./Styles";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/");
    await dispatch(logoutUser());
  };

  return (
    <div>
      <Typography variant="h6" sx={{ marginTop: 5, marginBottom: 5 }}>
        Log out from the application?
      </Typography>
      <Button variant="contained" color="success" onClick={handleLogout}>
        log out
      </Button>
    </div>
  );
};

export default Logout;
