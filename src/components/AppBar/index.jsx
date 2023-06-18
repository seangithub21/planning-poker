import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

import { auth as firebaseAuth } from "configs/firebase";
import {
  setUser,
  setLoading,
  signOut,
  signOutAsNonAdmin,
  toggleSpectatorMode,
} from "features/auth/authSlice";
import { isAdmin, removeAdmin, removeGameId } from "utils/localStorage";
import { findCurrentVotingStoryOrderNumber } from "utils/currentVotingStoryId";
import Logo from "assets/svg/Logo";
import Button from "common/Button";
import Loading from "common/Loading";
import DropDownMenu from "common/DropDownMenu";
import Tooltip from "common/Tooltip";
import SignUpModal from "components/SignUpModal";
import SignInModal from "components/SignInModal";
import ForgotPasswordModal from "components/ForgotPasswordModal";
import InvitePlayersModal from "components/InvitePlayersModal";
import GameSettingsModal from "./components/GameSettingsModal";

import getStyles from "./styles";

const gameOptions = [
  {
    label: "Game settings",
    value: "gameSettings",
    icon: <SettingsOutlinedIcon sx={{ fontSize: "2rem" }} />,
  },
  {
    label: "Voting history",
    value: "votingHistory",
    icon: <PendingActionsOutlinedIcon sx={{ fontSize: "2rem" }} />,
  },
];

const userOptons = [
  {
    label: "Spectator mode",
    value: "spectatorMode",
    icon: <VisibilityOutlinedIcon sx={{ fontSize: "2rem" }} />,
  },
  {
    label: "My account",
    value: "myAccount",
    icon: <ManageAccountsOutlinedIcon sx={{ fontSize: "2rem" }} />,
  },
  {
    label: "Sign out",
    value: "signOut",
    icon: <LogoutOutlinedIcon sx={{ fontSize: "2rem" }} />,
  },
];

const AppBar = ({ open, handleDrawerOpen, ...props }) => {
  const classes = getStyles({ open });
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { gameId } = useParams();
  const { game, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        console.log("User updated: ", user);
        dispatch(
          setUser({
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            isAnonymous: user.isAnonymous,
            cardChosen: null,
          })
        );
      } else {
        dispatch(setUser(""));
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isVotingStoryIdNow = findCurrentVotingStoryOrderNumber(game.stories);

  const handleClickLogo = () => {
    const callback = () => {
      removeAdmin();
      removeGameId();
      navigate("/");
    };
    dispatch(setLoading(true));
    if (isAdmin()) {
      dispatch(signOut({ callback, gameId }));
    } else {
      navigate("/");
      dispatch(signOutAsNonAdmin({ gameId }));
    }
  };

  const handleCloseModal = () => {
    setModalOpen("");
  };

  const handleOpenSignUpModal = () => {
    setModalOpen("signup");
  };

  const handleOpenSignInModal = () => {
    setModalOpen("signin");
  };

  const handleOpenForgotPasswordModal = () => {
    setModalOpen("forgotPassword");
  };

  const handleOpenInvitePlayersModal = () => {
    setModalOpen("invitePlayers");
    const url = window.location.href;
    setInviteLink(url);
  };

  const handleChangeInviteLink = (value) => {
    setInviteLink(value);
  };

  const handleChooseGameOption = (option) => {
    if (option === "gameSettings") {
      setModalOpen("gameSettings");
    } else {
      console.log("Game option chosen: ", option);
    }
  };

  const handleChooseUserOption = (option) => {
    if (option === "signOut") {
      handleClickLogo();
    }
    if (option === "spectatorMode") {
      const data = { spectatorMode: !auth.user?.spectatorMode };
      dispatch(toggleSpectatorMode({ gameId, userData: auth.user, data }));
    }
  };

  return (
    <Box>
      <MuiAppBar position="fixed" open={true} sx={classes.appBar}>
        <Toolbar sx={classes.toolbar}>
          <Box sx={classes.logo}>
            {location.pathname.includes("create-game") ? (
              <Typography variant="h6">Create game</Typography>
            ) : gameId ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                <Typography
                  variant="h3"
                  sx={{ cursor: "pointer", color: theme.palette.primary.main }}
                  onClick={handleClickLogo}
                >
                  Logo
                </Typography>
                <Box>
                  <DropDownMenu
                    title={game?.currentGame?.name}
                    menuItems={gameOptions}
                    handleClickMenuItem={handleChooseGameOption}
                  />
                  {game?.stories &&
                    !!Object.keys(game.stories).length &&
                    isVotingStoryIdNow && (
                      <Typography
                        sx={{
                          fontFamily: "UbuntuRegular",
                          fontSize: "1.8rem",
                          paddingLeft: ".8rem",
                          color: "#a8aeb2",
                        }}
                      >
                        Voting:{" "}
                        <span
                          style={{
                            fontFamily: "UbuntuRegular",
                            color: "#48545d",
                          }}
                        >
                          PT-{isVotingStoryIdNow}
                        </span>
                      </Typography>
                    )}
                </Box>
              </Box>
            ) : location.pathname === "/" ? (
              <Logo />
            ) : (
              <Logo onClick={handleClickLogo} sx={{ cursor: "pointer" }} />
            )}
          </Box>
          {location.pathname === "/create-game" ? null : !auth.isLoading ? (
            <Box sx={classes.toolbarRight}>
              {(location.pathname === "/" || gameId) && !!auth.user ? (
                <DropDownMenu
                  title={auth.user.displayName || auth.user.email}
                  menuItems={userOptons}
                  handleClickMenuItem={handleChooseUserOption}
                  isUserSettings
                />
              ) : (
                <>
                  <Button variant="text" onClick={handleOpenSignUpModal}>
                    Sign Up
                  </Button>
                  <Button variant="text" onClick={handleOpenSignInModal}>
                    Login
                  </Button>
                </>
              )}

              {gameId && (
                <>
                  <Tooltip title="Invite players">
                    <Box>
                      <Button
                        variant="outlined"
                        onClick={handleOpenInvitePlayersModal}
                        sx={classes.invitePlayersAndDrawerButton}
                      >
                        <PersonAddAltOutlinedIcon fontSize="large" />
                      </Button>
                    </Box>
                  </Tooltip>
                  <Tooltip title="Show issues">
                    <Box>
                      <Button
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                        variant="outlined"
                        sx={classes.invitePlayersAndDrawerButton}
                      >
                        <ArticleOutlinedIcon fontSize="large" />
                      </Button>
                    </Box>
                  </Tooltip>
                </>
              )}
            </Box>
          ) : (
            <Loading />
          )}
        </Toolbar>
      </MuiAppBar>
      <SignUpModal
        open={modalOpen === "signup"}
        handleCloseModal={handleCloseModal}
        signIn={handleOpenSignInModal}
      />
      <SignInModal
        open={modalOpen === "signin"}
        handleCloseModal={handleCloseModal}
        signUp={handleOpenSignUpModal}
        forgotPassword={handleOpenForgotPasswordModal}
      />
      <ForgotPasswordModal
        open={modalOpen === "forgotPassword"}
        handleCloseModal={handleCloseModal}
        signUp={handleOpenSignUpModal}
        signIn={handleOpenSignInModal}
      />
      <InvitePlayersModal
        open={modalOpen === "invitePlayers"}
        handleCloseModal={handleCloseModal}
        inviteLink={inviteLink}
        onChange={handleChangeInviteLink}
      />
      <GameSettingsModal
        open={modalOpen === "gameSettings"}
        handleCloseModal={handleCloseModal}
        withCloseIcon
      />
    </Box>
  );
};

export default AppBar;
