import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  Container,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import PasswordField from "./PasswordField.jsx";
import { setNotification } from "../reducers/notificationReducer.js";
import { loginUser } from "../reducers/userReducer.js";
import userService from "../services/users";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const validPassword = (password) => {
    if (password.length < 8) {
      return false;
    }

    return /\d/.test(password);
  };

  const handleRegistration = async (event) => {
    event.preventDefault();

    if (!validPassword(password)) {
      await dispatch(
        setNotification(
          {
            data: `Password must have at least 8 characters (including at least one number).`,
            type: "error",
          },
          4000,
        ),
      );
      return;
    }

    if (password !== password2) {
      await dispatch(
        setNotification({ data: `Passwords don't match`, type: "error" }, 3000),
      );
      setPassword("");
      setPassword2("");
      return;
    }

    try {
      const userObject = {
        username: username,
        name: name,
        email: email,
        password: password,
      };

      await userService.create(userObject);
      await dispatch(loginUser({ username, password }));
      await dispatch(
        setNotification({ data: `Registration ok`, type: "info" }, 3000),
      );
      navigate("/");
    } catch (exception) {
      await dispatch(
        setNotification(
          { data: `${exception.response.data.error}`, type: "error" },
          3000,
        ),
      );
    }
  };

  return (
    <Container sx={{ marginLeft: 1 }}>
      <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
        Register
      </Typography>
      <form onSubmit={handleRegistration}>
        <FormControl
          sx={{ marginTop: 1, width: "30ch", backgroundColor: "white" }}
          variant="outlined"
        >
          <TextField
            id="outlined-controlled"
            data-testid="name"
            label="Name"
            name={name}
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
            onChange={({ target }) => setName(target.value)}
          />
        </FormControl>
        <br />
        <FormControl
          sx={{ marginTop: 1, width: "30ch", backgroundColor: "white" }}
          variant="outlined"
        >
          <TextField
            id="outlined-controlled"
            data-testid="email"
            label="Email"
            email={email}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton disableRipple={true}>
                      <EmailIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            onChange={({ target }) => setEmail(target.value)}
          />
        </FormControl>
        <br />
        <FormControl
          sx={{ marginTop: 1, width: "30ch", backgroundColor: "white" }}
          variant="outlined"
        >
          <TextField
            id="outlined-controlled"
            data-testid="username"
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
        <PasswordField
          inputText={"Confirm password"}
          password={password2}
          handleChange={({ target }) => setPassword2(target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 3, marginBottom: 3 }}
          type="submit"
        >
          register
        </Button>
      </form>
    </Container>
  );
};

export default Registration;
