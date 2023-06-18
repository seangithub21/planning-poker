import theme from "configs/theme";

const getStyles = () => {
  return {
    drawer: {
      width: "24rem",
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: "40rem",
        padding: "0 2rem",
        border: "none",
      },
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "space-between",
      height: "10rem",
      color: theme.palette.grey[800],
    },
    drawerHeaderTitle: {
      fontSize: "1.8rem",
      fontWeight: 700,
    },
    cross: {
      color: theme.palette.grey[800],
      fontSize: "2.5rem",
      cursor: "pointer",
    },
  };
};

export default getStyles;
