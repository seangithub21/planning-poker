import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3993ff",
      hover: "#74b3ff",
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
    text: {
      primary: "#1a2935",
    },
    error: {
      main: "#E74B3B",
    },
    playerCard: "#e8e9ea",
    greyButton: "#48545d",
    votingIssue: {
      main: "#ebf4ff",
      hover: "#d7e9ff",
    },
    estimateCardDisabled: {
      main: "#a8aeb2",
    },
    progressBar: {
      main: "#f1f1f1",
    },
    inputText: {
      main: "#333333",
    },
    pinkButton: {
      main: "#ff3d71",
      hover: "#ff779b",
    },
  },
  typography: {
    fontFamily: [
      "BlinkMacSystemFont",
      "Segoe UI",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
    body1: {
      fontSize: "1.6rem",
    },
    body2: {
      fontSize: "1.2rem",
      color: "#F1F1F1",
    },
    button: {
      fontSize: "1.4rem",
      fontWeight: "600",
    },
    tooltip: {
      fontSize: "1.2rem",
    },
    h1: {
      fontSize: "5.6rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "3rem",
      fontWeight: 700,
    },
    h6: {
      fontSize: "2rem",
      fontWeight: 700,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: 10,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: "#fff", boxShadow: "none" },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "1.8rem",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "1.2rem",
          marginLeft: "0rem",
          marginTop: "0rem",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          border: "1px solid #ec407a",
          borderRadius: ".8rem",
          backgroundColor: "#fce4ec",
          color: "#ec407a",
          fontSize: "1.4rem",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1.6rem",
          fontWeight: 600,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          "& .MuiPaper-root": {
            borderRadius: ".8rem",
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1400,
      xl: 1536,
    },
  },
});

export default theme;
