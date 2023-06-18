const getStyles = ({ theme }) => {
  return {
    title: {
      mb: "2rem",
    },
    field: {
      mb: "3rem",
      width: "100%",
    },
    button: {
      width: "100%",
      mt: "1rem",
      mb: "2rem",
    },
    signUpSignIn: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    passwordSent: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      mt: "4rem",
      "& p": {
        fontFamily: "UbuntuRegular",
        color: theme.palette.estimateCardDisabled.main,
      },
    },
  };
};

export default getStyles;
