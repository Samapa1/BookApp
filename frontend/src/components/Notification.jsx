import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

const Notification = () => {
  const message = useSelector((state) => state.notification);

  if (message.data === null) {
    return;
  }

  if (message.type === "error") {
    return (
      <Alert
        variant="outlined"
        severity="error"
        sx={{
          marginBottom: 2,
          marginTop: 2,
          color: "#FF342F",
          fontFamily: ["Futura", "sans-serif"],
          fontSize: 16,
        }}
      >
        {message.data}
      </Alert>
    );
  }

  return (
    <Alert
      variant="outlined"
      severity="success"
      sx={{
        marginBottom: 2,
        marginTop: 2,
        color: "#366169",
        fontFamily: ["Futura", "sans-serif"],
        fontSize: 16,
      }}
    >
      {message.data}
    </Alert>
  );
};

export default Notification;
