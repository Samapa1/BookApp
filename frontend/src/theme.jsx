import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#366169",
    },
    secondary: {
      main: "#54a4a6",
    },
    success: {
      main: "#3c6d75",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Futura", "sans-serif"],
    fontSize: 14,
    allVariants: {
      color: "#366169",
    },
  },
});

// export const theme = createTheme({
//   palette: {
//     primary: {
//       light: "#54a4a6",
//       main: "#366169",
//     },
//   },
//   typography: {
//     fontFamily: ["Futura", "sans-serif"],
//     fontSize: 14,
//     color: "#366169",
//   },
// });
