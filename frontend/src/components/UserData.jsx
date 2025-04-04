import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
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

import { getUserData } from "../reducers/userReducer";
import { updateUser } from "../reducers/userReducer";
import { removeUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import PasswordField from "./PasswordField";

const UserData = () => {
  const [nameOfTheUser, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleRemoval = async () => {
    try {
      if (window.confirm(`Delete account permanently?`)) {
        await dispatch(removeUser({ id: user.id, password: password }));
        navigate("/");
        await dispatch(
          setNotification(
            { data: `User removed permanently.`, type: "info" },
            3000,
          ),
        );
      }
    } catch (exception) {
      console.log(exception);
      await dispatch(
        setNotification(
          { data: `${exception.response.data.error}`, type: "error" },
          3000,
        ),
      );
    }
  };

  const handleChanges = async (event) => {
    event.preventDefault();

    try {
      if (!newPassword && !newPassword2) {
        await dispatch(
          updateUser({
            ...user,
            name: nameOfTheUser,
            email: email,
            oldPassword: password,
          }),
        );
        await dispatch(
          setNotification(
            { data: `Changes saved succesfully`, type: "info" },
            3000,
          ),
        );
      }

      await dispatch(
        updateUser({
          ...user,
          name: nameOfTheUser,
          email: email,
          oldPassword: password,
          newPassword: newPassword,
          newPassword2: newPassword2,
        }),
      );
      setPassword("");
      setNewPassword("");
      setNewPassword2("");
      await dispatch(
        setNotification(
          { data: `Changes saved succesfully`, type: "info" },
          3000,
        ),
      );
    } catch (exception) {
      console.log(exception);
      await dispatch(
        setNotification(
          { data: `${exception.response.data.error}`, type: "error" },
          3000,
        ),
      );
    }
  };

  return (
    <Container sx={{ marginLeft: 1, paddingBottom: 5 }}>
      <Typography variant="h5" sx={{ marginBottom: 3, marginTop: 5 }}>
        User details
      </Typography>
      <form onSubmit={handleChanges}>
        <FormControl
          sx={{ marginTop: 1, width: "30ch", backgroundColor: "white" }}
          variant="outlined"
        >
          <TextField
            id="outlined-controlled"
            data-testid="name"
            label="Name"
            value={nameOfTheUser}
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
          sx={{ marginTop: 1.5, width: "30ch", backgroundColor: "white" }}
          variant="outlined"
        >
          <TextField
            id="outlined-controlled"
            data-testid="email"
            label="Email"
            value={email}
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
        <PasswordField
          inputText={"Password"}
          password={password}
          handleChange={({ target }) => setPassword(target.value)}
        />
        <PasswordField
          inputText={"New password"}
          password={newPassword}
          handleChange={({ target }) => setNewPassword(target.value)}
        />
        <PasswordField
          inputText={"Confirm new password"}
          password={newPassword2}
          handleChange={({ target }) => setNewPassword2(target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2, marginBottom: 2 }}
          type="submit"
        >
          Save changes
        </Button>
      </form>
      <br></br>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={() => handleRemoval()}
      >
        Delete account
      </Button>
    </Container>
  );
};

export default UserData;
