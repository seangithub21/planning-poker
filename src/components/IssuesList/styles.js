const getStyles = ({ theme }) => ({
  listItem: {
    display: "flex",
    flexDirection: "column",
    gap: "1.6rem",
    minHeight: "10rem",
    borderRadius: ".8rem",
    mb: "1.5rem",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 .1rem .4rem rgba(26,41,53,.24)",
    "&:hover": {
      backgroundColor: "#f1f1f1",
    },
  },
  listItemTopBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  listItemTitle: {
    width: "100%",
  },
  voteIssueButton: {
    backgroundColor: "#e8e9ea",
    color: theme.palette.text.primary,
    fontSize: "1.6rem",
    "&:hover": {
      backgroundColor: "#d1d4d7",
      color: theme.palette.text.primary,
    },
  },
  issuePoints: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    width: "4rem",
    backgroundColor: "#e8e9ea",
    color: theme.palette.text.primary,
    borderRadius: ".8rem",
    fontWeight: 600,
  },
});

export const getStoryDetailsModalStyles = ({ theme }) => ({
  container: {
    width: "84.8rem",
    maxWidth: "100%",
  },
  field: {
    cursor: "pointer",
    p: ".8rem",
    borderRadius: ".7rem",
    "&:hover": {
      backgroundColor: theme.palette.progressBar.main,
    },
  },
  editIcon: {
    fontSize: "2.4rem",
  },
  idAndTitleContainer: {
    mb: "3.2rem",
  },
  idContainer: {
    maxWidth: "24rem",
  },
  id: {
    fontFamily: "UbuntuRegular",
    fontSize: "1.8rem",
    color: theme.palette.greyButton,
  },
  title: {
    fontFamily: "UbuntuBold",
    fontSize: "2.25rem",
    color: theme.palette.text.primary,
  },
  linkInfoAndDescriptionContainer: {
    mb: "3.2rem",
  },
  linkAndDescriptionLabelContainer: {
    display: "flex",
    alignItems: "center",
  },
  linkAndDescriptionLabel: {
    fontFamily: "UbuntuBold",
    fontSize: "1.8rem",
    color: theme.palette.text.primary,
    p: ".8rem",
  },
  emptyLinkAndDescription: {
    backgroundColor: theme.palette.progressBar.main,
    color: theme.palette.greyButton,
    fontSize: "1.8rem",
    p: "1.2rem 2.4rem",
    transition: "all .1s",
    "&:hover": {
      backgroundColor: theme.palette.playerCard,
    },
  },
  linkAndDescription: {
    fontFamily: "UbuntuRegular",
    fontSize: "1.8rem",
    padding: ".8rem",
  },
  descriptionInput: {
    fontSize: "1.8rem",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});

export const getEditFieldFormStyles = ({ theme }) => ({
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1.6rem",
  },
});

export const getStoryDeleteModalStyles = ({ theme }) => ({
  modal: {
    width: "63rem",
  },
  title: {
    fontSize: "2.4rem",
    fontFamily: "UbuntuBold",
    mb: ".4rem",
  },
  subTitle: {
    fontSize: "1.8rem",
    color: theme.palette.greyButton,
    fontFamily: "UbuntuRegular",
  },
  buttonsBlock: {
    display: "flex",
    gap: "1.6rem",
    mt: "2.4rem",
  },
  delete: {
    background: theme.palette.pinkButton.main,
    "&:hover": {
      background: theme.palette.pinkButton.hover,
    },
  },
});

export default getStyles;
