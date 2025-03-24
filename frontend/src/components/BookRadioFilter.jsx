import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
} from "@mui/material";

const BookRadioFilter = ({ fictionality, setFictionality }) => {
  const handleFictionality = (event) => {
    setFictionality(event.target.value);
  };
  return (
    <FormControl>
      <RadioGroup
        row
        name="controlled-radio-buttons-group"
        value={fictionality}
        onChange={handleFictionality}
      >
        <FormControlLabel value="fiction" control={<Radio />} label="fiction" />
        <FormControlLabel
          value="non-fiction"
          control={<Radio />}
          label="non-fiction"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default BookRadioFilter;
