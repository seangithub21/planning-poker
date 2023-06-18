import theme from "configs/theme";

const getStyles = () => {
  return {
    switch: {
      width: "4.2rem",
      height: "2.6rem",
      padding: "0rem",
      m: "1rem",
      "& .MuiSwitch-switchBase": {
        padding: "0rem",
        margin: ".2rem",
        transitionDuration: "300ms",
        "&.Mui-checked": {
          transform: "translateX(1.6rem)",
          color: "#fff",
          "& + .MuiSwitch-track": {
            opacity: 1,
            border: "0rem",
          },
          "&.Mui-disabled + .MuiSwitch-track": {
            opacity: 0.5,
          },
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
          color: "#33cf4d",
          border: ".6rem solid #fff",
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
          color: theme.palette.grey[100],
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.7,
        },
      },
      "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: "2.2rem",
        height: "2.2rem",
      },
      "& .MuiSwitch-track": {
        borderRadius: 26 / 2,
        backgroundColor: "#E9E9EA",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
          duration: 500,
        }),
      },
    },
  };
};

export default getStyles;
