const getStyles = ({ theme }) => {
  return {
    container: {
      display: "flex",
      flexDirection: { xs: "column", lg: "row" },
      gap: "10rem",
      justifyContent: "center",
      alignItems: "center",
      flex: "1 0 auto",
    },
    blockLeft: {
      mt: { xs: "10rem", lg: "0" },
      textAlign: { xs: "center", lg: "left" },
      maxWidth: { xs: "84.5rem", lg: "52rem" },
      "& h1": {
        fontFamily: "UbuntuBold",
        fontWeight: 400,
      },
      "& p": {
        fontSize: "1.8rem",
        fontFamily: "UbuntuRegular",
        color: theme.palette.greyButton,
      },
    },
    blockLeftButton: {
      minWidth: "30rem",
      height: "4.8rem",
    },
    blockRightImage: {
      "& img": {
        maxWidth: "100%",
      },
    },
    blockRight: {
      maxWidth: "62.8rem",
    },
  };
};

export default getStyles;
