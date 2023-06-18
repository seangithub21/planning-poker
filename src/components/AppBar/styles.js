import theme from "configs/theme";

const getStyles = ({ open }) => {
  return {
    appBar: {
      backgroundColor: "#f9f9f9",
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
        width: `calc(100% - 40rem)`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: "40rem",
      }),
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      height: "10rem",
    },
    logo: {
      color: theme.palette.text.primary,
      pl: "4rem",
    },
    toolbarRight: {
      display: "flex",
      gap: "2.4rem",
      pr: "4rem",
    },
    invitePlayersAndDrawerButton: {
      minWidth: "auto",
      width: "4.8rem",
      height: "4.8rem",
      "&.MuiButtonBase-root": {
        border: ".2rem solid",
      },
    },
  };
};

export const getGameSettingsModalStyles = ({ theme }) => ({
  title: {
    mb: "4rem",
    fontSize: "2.4rem",
    fontFamily: "UbuntuBold",
  },
  field: {
    mb: "1.6rem",
  },
  menuItemText: {
    display: "flex",
    gap: "1rem",
    fontFamily: "UbuntuRegular",
    color: theme.palette.inputText.main,
  },
  avatar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    color: theme.palette.primary.main,
    bgcolor: "#d7e9ff",
    fontWeight: 700,
    width: "3.2rem",
    height: "3.2rem",
  },
  button: {
    mt: "2rem",
  },
  selectContainer: {
    gap: ".4rem",
  },
  selectValue: {
    borderRadius: ".2rem",
    fontSize: "85%",
    fontFamily: "UbuntuRegular",
  },
});

export default getStyles;
