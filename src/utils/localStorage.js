export const saveGameId = (gameId) => {
  localStorage.setItem("gameId", gameId);
};

export const getGameId = () => {
  return localStorage.getItem("gameId");
};

export const removeGameId = () => {
  localStorage.removeItem("gameId");
};

export const setAdmin = () => {
  localStorage.setItem("role", "admin");
};

export const isAdmin = () => {
  const role = localStorage.getItem("role") === "admin";
  return role;
};

export const removeAdmin = () => {
  localStorage.removeItem("role");
};
