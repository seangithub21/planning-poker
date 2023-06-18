const getStyles = ({ theme } = {}) => ({
  container: {
    textAlign: "center",
  },
  title: {
    mb: "2rem",
  },
  estimateCardsContainer: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  containerResults: {
    display: "flex",
    justifyConent: "space-between",
    alignItems: "center",
    height: "22rem",
  },
  containerResultsSpacing: {
    width: "4rem",
  },
  pointsList: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "3.2rem",
    height: "100%",
  },
  pointsListItem: {
    height: "100%",
    alignItems: "flex-end",
  },
  averageContainer: {
    display: "flex",
    flexDirection: "column",
  },
  averageContainerTop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  averageTitle: {
    color: theme.palette.estimateCardDisabled.main,
    fontSize: "1.8rem",
    fontFamily: "UbuntuRegular",
  },
  averageText: {
    fontSize: "3rem",
    fontFamily: "UbuntuBold",
    color: theme.palette.text.primary,
  },
});

export const getEstimateCardStyles = ({ theme, isChosen }) => ({
  estimateCard: {
    minWidth: "auto",
    width: "4.8rem",
    height: "8rem",
    border: `.2rem solid ${theme.palette.primary.main}`,
    borderRadius: ".8rem",
    color: isChosen
      ? theme.palette.background.paper
      : theme.palette.primary.main,
    transition: "all .1s",
    marginTop: isChosen && "-.8rem",
    backgroundColor: isChosen && theme.palette.primary.main,
    fontWeight: 700,
    "&:hover": {
      marginTop: !isChosen ? "-.5rem" : "-.8rem",
      backgroundColor: !isChosen
        ? theme.palette.votingIssue.main
        : theme.palette.primary.main,
      border: `.2rem solid ${theme.palette.primary.main}`,
    },
    "&.Mui-disabled": {
      border: `.2rem solid ${theme.palette.estimateCardDisabled.main}`,
      backgroundColor: !isChosen
        ? theme.palette.background.default
        : theme.palette.estimateCardDisabled.main,
      color: !isChosen
        ? theme.palette.estimateCardDisabled.main
        : theme.palette.background.default,
    },
  },
});

export const getResultsCardStyles = ({ theme }) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    justifyContent: "space-between",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.8rem",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "4rem",
    height: "6.4rem",
    border: `.2rem solid ${theme.palette.text.primary}`,
    borderRadius: ".8rem",
    "& p": {
      fontFamily: "UbuntuBold",
      fontSize: "1.8rem",
      color: theme.palette.text.primary,
    },
  },
  progressBarContainer: {
    display: "flex",
    height: "8.5rem",
    justifyContent: "center",
  },
  progressBar: {
    borderRadius: "0.8rem",
    backgroundColor: theme.palette.progressBar.main,
    height: "100%",
    overflow: "hidden",
    position: "relative",
    width: "0.8rem",
  },
  progressBarFill: {
    backgroundColor: theme.palette.text.primary,
    borderRadius: "0.8rem",
    bottom: "0",
    left: "0",
    right: "0",
    position: "absolute",
  },
  voteQuantity: {
    whiteSpace: "nowrap",
    fontFamily: "UbuntuRegular",
  },
});

export const getSpectatorModeStyles = () => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "16rem",
  },
  message: {
    fontFamily: "UbuntuRegular",
    fontSize: "1.8rem",
  },
});

export default getStyles;
