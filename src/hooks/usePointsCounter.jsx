import { useSelector } from "react-redux";

import {
  calculateAverage,
  calculateGroupedPoints,
  calculateResult,
  calculateTotalPoints,
  calculateUserPoints,
} from "utils/pointsCalculator";

const usePointsCounter = () => {
  const { game, auth } = useSelector((state) => state);

  const userPoints = calculateUserPoints(auth);
  const totalPoints = calculateTotalPoints(game);

  if (userPoints || userPoints === 0) totalPoints.push(userPoints);

  const groupedPoints = calculateGroupedPoints(totalPoints);
  const average = calculateAverage(game, totalPoints);
  const result = calculateResult(game, totalPoints, average);

  return { userPoints, totalPoints, groupedPoints, average, result };
};

export default usePointsCounter;
