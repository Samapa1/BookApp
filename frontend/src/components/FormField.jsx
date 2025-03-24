import { TextField, FormControl } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const FormField = ({ field, fieldLabel, setField, icon }) => {
  return (
    <>
      <FormControl
        sx={{ marginTop: 1, width: "30ch", backgroundColor: "white" }}
        variant="outlined"
      >
        <TextField
          id="outlined-controlled"
          data-testid={field}
          label={fieldLabel}
          value={field}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton disableRipple={true}>{icon}</IconButton>
                </InputAdornment>
              ),
            },
          }}
          onChange={({ target }) => setField(target.value)}
        />
      </FormControl>
      <br />
    </>
  );
};

export default FormField;
