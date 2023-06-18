import votingSystem from "pages/CreateGamePage/votingSystem";

export const calculateUserPoints = (auth) =>
  auth.user?.cardChosen || auth.user?.cardChosen === 0
    ? auth.user?.cardChosen
    : null;

export const calculateTotalPoints = (game) =>
  game?.players.reduce((points, player) => {
    (player.cardChosen || player.cardChosen === 0) &&
      points.push(player.cardChosen);
    return points;
  }, []);

export const calculateGroupedPoints = (totalPoints) =>
  !!totalPoints.length ? Array.from(new Set([...totalPoints])) : [];

export const calculateAverage = (game, totalPoints) => {
  if (!totalPoints.length) return null;
  if (game.currentGame.votingSystem !== "tShirts") {
    const filteredTotalPoints = totalPoints.filter(
      (point) => typeof point === "number"
    );
    return Math.round(
      filteredTotalPoints.reduce((prev, curr) => prev + curr, 0) /
        filteredTotalPoints.length
    );
  } else {
    const tShirtsCards = votingSystem.find(
      (system) => system.value === "tShirts"
    ).cards;
    const filteredTotalPoints = totalPoints.filter((point) => point !== "☕");
    const normalized = filteredTotalPoints.map((point) =>
      tShirtsCards.findIndex((card) => card === point)
    );
    return tShirtsCards[
      Math.round(
        normalized.reduce((prev, curr) => prev + curr, 0) /
          filteredTotalPoints.length
      )
    ];
  }
};

export const calculateResult = (game, totalPoints, average) => {
  if (!totalPoints.length) return null;
  if (game.currentGame.votingSystem !== "tShirts") {
    return totalPoints.reduce((prev, curr) =>
      Math.abs(curr - average) < Math.abs(prev - average) ? curr : prev
    );
  } else {
    const tShirtsCards = votingSystem.find(
      (system) => system.value === "tShirts"
    ).cards;
    const averageIndex = tShirtsCards.findIndex((card) => card === average);

    return tShirtsCards.reduce((prev, curr) =>
      Math.abs(curr - averageIndex) < Math.abs(prev - averageIndex)
        ? curr
        : prev
    );
  }
};
