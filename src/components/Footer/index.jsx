import { useSelector } from "react-redux";

import { FINISHED_COUNTING } from "constants/gameState";
import EstimateCards from "./components/EstimateCards";
import Results from "./components/Results";
import SpectatorMode from "./components/SpectatorMode";

const Footer = () => {
  const { game, auth } = useSelector((state) => state);

  const isDuscussing = game.currentGame?.state !== FINISHED_COUNTING;

  return auth.user.spectatorMode ? (
    <SpectatorMode />
  ) : isDuscussing ? (
    <EstimateCards />
  ) : (
    <Results />
  );
};

export default Footer;
