import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { TextField, FormControl } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const PasswordField = ({ password, handleChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  return (
    <div>
      <FormControl sx={{ marginTop: 1, width: "30ch" }} variant="outlined">
        <TextField
          id="outlined-controlled"
          type={showPassword ? "text" : "password"}
          label="Password"
          value={password}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handlePasswordVisibility}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          onChange={handleChange}
        />
      </FormControl>
    </div>
  );
};

export default PasswordField;
