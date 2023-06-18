import theme from "configs/theme";

const getStyles = () => {
  return {
    container: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      minWidth: "35rem",
      bgcolor: "background.paper",
      borderRadius: "1rem",
      boxShadow: "rgb(38, 57, 77) 0rem 2rem 3rem -1rem;",
      p: "4rem",
    },
    cross: {
      color: theme.palette.grey[800],
      cursor: "pointer",
      fontSize: "2.5rem",
    },
  };
};

export default getStyles;
