import theme from "configs/theme";

const getStyles = ({ open }) => {
  return {
    container: {
      display: "flex",
      backgroundColor: "#f9f9f9",
    },
    content: {
      display: "flex",
      height: "100vh",
      p: "10rem 1rem 1rem 1rem",
      flexGrow: 1,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: "-24rem",
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: "16rem",
      }),
    },
  };
};

export default getStyles;
