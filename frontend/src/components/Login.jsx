import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../reducers/userReducer.js";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../reducers/notificationReducer.js";
import {
  TextField,
  Button,
  FormControl,
  Typography,
  Container,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";

import PasswordField from "./PasswordField.jsx";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await dispatch(loginUser({ username, password }));
      navigate("/");
      await dispatch(
        setNotification({ data: `${username} logged in`, type: "info" }, 3000),
      );
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      // navigate("/login");
      await dispatch(
        setNotification(
          { data: "Invalid username or password", type: "error" },
          3000,
        ),
      );
    }
  };

  return (
    <Container sx={{ marginLeft: 1, paddingBottom: 5 }}>
      <Typography variant="h5" sx={{ marginBottom: 2, marginTop: 5 }}>
        Log in to application
      </Typography>
      <form onSubmit={handleLogin}>
        <FormControl
          sx={{ width: "30ch", backgroundColor: "white" }}
          variant="outlined"
        >
          <TextField
            id="outlined-controlled"
            label="Username"
            username={username}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton disableRipple={true}>
                      <AccountCircle />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            onChange={({ target }) => setUsername(target.value)}
          />
        </FormControl>
        <PasswordField
          inputText={"Password"}
          password={password}
          handleChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginBottom: 5 }}
        >
          login
        </Button>
      </form>
      <Link
        style={{ color: "#54A4A6", fontFamily: ["Futura", "sans-serif"] }}
        to={`/register`}
      >
        Do not have an account yet? Please register.
      </Link>
    </Container>
  );
};

export default Login;
