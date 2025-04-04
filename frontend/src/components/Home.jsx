import { Container, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "../theme";

const Home = ({ user }) => {
  let reservationsForCollection = false;

  if (user && user.reservations) {
    if (
      user.reservations.find((reservedBook) => reservedBook.available === true)
    ) {
      reservationsForCollection = true;
    }
  }

  return (
    <Container sx={{ marginLeft: 1 }}>
      <ThemeProvider theme={theme}>
        <Typography
          variant="h4"
          color="primary"
          sx={{ marginTop: 5, marginBottom: 5 }}
        >
          Welcome to the book app!
        </Typography>
        <Typography variant="body1" color="primary">
          Here you can borrow books and return your loans.
        </Typography>
        {reservationsForCollection ? (
          <Typography variant="body1" color="primary">
            You have reservations that are ready for collection. Please remember
            to borrow them at your own page!
          </Typography>
        ) : (
          ""
        )}
      </ThemeProvider>
    </Container>
  );
};

export default Home;
