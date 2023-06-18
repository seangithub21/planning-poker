import theme from "configs/theme";

export const getStyles = ({ borderAnimationOn }) => {
  return {
    container: {
      margin: "auto",
      textAlign: "center",
    },
    board: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "33.8rem",
      height: "15.1rem",
      margin: "auto",
      backgroundColor: "#d7e9ff",
      borderRadius: "2rem",
    },
    boardBorder: borderAnimationOn
      ? {
          position: "relative",
          "--borderWidth": "1rem",
          borderRadius: "var(--borderWidth)",
          zIndex: 0,
          "&::after": {
            content: "''",
            position: "absolute",
            top: "calc(-.25 * var(--borderWidth))",
            left: "calc(-.13 * var(--borderWidth))",
            height: "calc(100% + var(--borderWidth) * .5)",
            width: " calc(100% + var(--borderWidth) * .25)",
            background:
              "linear-gradient(45deg,#ebf4ff,#d7e9ff,#74b3ff,#3993ff,#0061d6,#3993ff,#74b3ff,#d7e9ff,#ebf4ff)",
            borderRadius: "calc(2 * var(--borderWidth))",
            zIndex: "-1",
            animation: "animatedgradient 3s ease alternate infinite",
            backgroundSize: "300%",
            filter: "blur(1rem)",

            "@keyframes animatedgradient": {
              "0%": {
                backgroundPosition: "0% 50%",
              },
              "50%": {
                backgroundPosition: "100% 50%",
              },
              "100%": {
                backgroundPosition: "0% 50%",
              },
            },
          },
        }
      : {},
    votingInProgress: {
      fontSize: "1.8rem",
      fontFamily: "UbuntuRegular",
      color: theme.palette.greyButton,
    },
    countDown: { color: theme.palette.primary.main },
    newVotingButton: {
      background: theme.palette.greyButton,
      "&:hover": { background: theme.palette.text.primary },
    },
    leftTopPlayersGroup: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "5rem",
      mb: "-6rem",
    },
    rightTopPlayersGroup: {
      display: "flex",
      justifyContent: "flex-start",
      gap: "5rem",
      mb: "-6rem",
    },
    leftBottomPlayersGroup: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "5rem",
      mt: "-6rem",
    },
    rightBottomPlayersGroup: {
      display: "flex",
      justifyContent: "flex-start",
      gap: "5rem",
      mt: "-6rem",
    },
  };
};

export const getPlayerCardStyles = ({ cardChosen, finishedCounting }) => {
  return {
    cardContainer: {
      backgroundColor: !cardChosen && theme.palette.playerCard,
      width: "4rem",
      height: "7rem",
      m: "auto auto .8rem auto",
      borderRadius: ".8rem",
      perspective: "100rem",
    },
    cardContainerInner: {
      position: "relative",
      width: "100%",
      height: "100%",
      borderRadius: ".8rem",
      transition: "transform 0.8s",
      transformStyle: "preserve-3d",
      transform: finishedCounting && cardChosen && "rotateY(180deg)",
    },
    card: {
      position: "absolute",
      width: "100%",
      height: "100%",
      WebkitBackfaceVisibility: "hidden" /* Safari */,
      backfaceVisibility: "hidden",
      borderRadius: ".8rem",
    },
    spectatorCard: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: theme.palette.estimateCardDisabled.main,
      width: "100%",
      height: "100%",
      background: theme.palette.progressBar.main,
      border: `.2rem dashed ${theme.palette.estimateCardDisabled.main}`,
      borderRadius: ".8rem",
    },
    spectatorCardIcon: {
      fontSize: "2.4rem",
    },
    cardBackSide: {
      background:
        cardChosen &&
        "linear-gradient(45deg,#3993ff 12%,transparent 0,transparent 88%,#3993ff 0),linear-gradient(135deg,transparent 37%,#1a7bf2 0,#1a7bf2 63%,transparent 0),linear-gradient(45deg,transparent 37%,#3993ff 0,#3993ff 63%,transparent 0),#74b3ff;",
      backgroundSize: cardChosen && "1.7rem 1.7rem",
    },
    cardValueSide: {
      ...(finishedCounting
        ? {
            backgroundColor: theme.palette.background.default,
            border: `.2rem solid ${theme.palette.primary.main}`,
            transform: "rotateY(180deg)",
          }
        : {}),

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    cardValueText: {
      display: finishedCounting ? "block" : "none",
      fontFamily: "UbuntuBold",
      fontSize: "1.8rem",
      color: theme.palette.primary.main,
    },
    name: {
      width: "10rem",
      margin: "0 auto",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      fontSize: "1.8rem",
      fontFamily: "UbuntuBold",
    },
  };
};
