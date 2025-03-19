import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../reducers/userReducer.js";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../reducers/notificationReducer.js";
import { linkStyle2 } from "./Styles";
import { TextField, Button, FormControl, Typography } from "@mui/material";
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
      navigate("/");
      await dispatch(loginUser({ username, password }));
      await dispatch(
        setNotification({ data: `${username} logged in`, type: "info" }, 3000),
      );
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      navigate("/login");
      await dispatch(
        setNotification(
          { data: "Invalid username or password", type: "error" },
          3000,
        ),
      );
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ m: 2, marginTop: 5 }}>
        Log in to application
      </Typography>
      <form onSubmit={handleLogin}>
        <div>
          <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
            <TextField
              id="outlined-controlled"
              label="Username"
              username={username}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                },
              }}
              // variant="standard"
              onChange={({ target }) => setUsername(target.value)}
            />
          </FormControl>
        </div>
        <PasswordField
          inputText={"password"}
          password={password}
          handleChange={({ target }) => setPassword(target.value)}
        />
        <br></br>
        <Button variant="contained" color="primary" sx={{ m: 1 }} type="submit">
          login
        </Button>
      </form>
      <div>
        <br />
        <Link style={linkStyle2} to={`/register`}>
          Do not have an account yet? Please register.
        </Link>
      </div>
    </>
  );
};

export default Login;
