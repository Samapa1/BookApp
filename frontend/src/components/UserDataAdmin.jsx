import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { updateUser } from "../reducers/usersReducer";
import { removeUser } from "../reducers/usersReducer";
import { setNotification } from "../reducers/notificationReducer";
import FormField from "./FormField";

import { getUserData } from "../reducers/userReducer";
import userService from "../services/users";

const UserDataAdmin = () => {
  const id = useParams().id;
  const [user, setUser] = useState(null);
  const [nameOfTheUser, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [adminStatus, setAdminStatus] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await userService.getOne(id);
      setUser(userData);
      setName(userData.name);
      setUserName(userData.username);
      setEmail(userData.email);
      setAdminStatus(userData.admin);
    };
    fetchData();
  }, [id]);

  const navigate = useNavigate();

  const handleChanges = async (event) => {
    event.preventDefault();

    try {
      await dispatch(
        updateUser({
          ...user,
          username: username,
          name: nameOfTheUser,
          email: email,
        }),
      );
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

  const addAdminStatus = async () => {
    if (window.confirm(`Make the user an admin?`)) {
      await dispatch(updateUser({ ...user, admin: true }));
      setAdminStatus(true);
      await dispatch(
        setNotification(
          { data: `Changes saved succesfully`, type: "info" },
          3000,
        ),
      );
    }
  };

  const removeAdminStatus = async () => {
    if (window.confirm(`Remove admin status from this user?`)) {
      await dispatch(updateUser({ ...user, admin: false }));
      setAdminStatus(false);
      await dispatch(
        setNotification(
          { data: `Changes saved succesfully`, type: "info" },
          3000,
        ),
      );
    }
  };

  const handleRemoveUser = async (user) => {
    if (window.confirm(`Remove ${user.name} permanently?`)) {
      navigate("/users");
      await dispatch(removeUser(user));
      await dispatch(
        setNotification({ data: `${user.name} removed`, type: "info" }, 3000),
      );
    }
  };
  if (user) {
    return (
      <Container sx={{ marginLeft: 1, paddingBottom: 5 }}>
        <Typography variant="h5" sx={{ marginBottom: 3, marginTop: 5 }}>
          User details
        </Typography>
        <form onSubmit={handleChanges}>
          <FormField
            field={username}
            fieldLabel={"Username"}
            setField={setUserName}
            icon={<AccountCircle />}
          />
          <FormField
            field={nameOfTheUser}
            fieldLabel={"Name"}
            setField={setName}
            icon={<AccountCircle />}
          />
          <FormField
            field={email}
            fieldLabel={"Email"}
            setField={setEmail}
            icon={<EmailIcon />}
          />
          <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
            Save changes
          </Button>
        </form>
        <Typography variant="body1" sx={{ marginTop: 3 }}>
          Books borrowed: {user.loans.length}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          Is admin: {adminStatus ? "yes" : "no"}
        </Typography>
        {user.loans.length === 0 ? (
          <Button
            variant="contained"
            sx={{ marginRight: 2 }}
            onClick={() => handleRemoveUser(user)}
          >
            Delete account
          </Button>
        ) : (
          <Typography variant="body1" sx={{ marginBottom: 3 }}>
            User has loans. If you wish to delete account, please return books
            first.
          </Typography>
        )}
        {adminStatus ? (
          <Button variant="contained" onClick={() => removeAdminStatus()}>
            Remove admin status
          </Button>
        ) : (
          <Button variant="contained" onClick={() => addAdminStatus()}>
            Make this user an admin
          </Button>
        )}
      </Container>
    );
  }
};

export default UserDataAdmin;
