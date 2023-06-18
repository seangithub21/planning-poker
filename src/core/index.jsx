import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { LinearProgress } from "@mui/material";

import { publicPaths } from "configs/routes";
import PublicRoute from "./PublicRoute";

const HomePage = lazy(() => import("pages/HomePage"));
const CreateGamePage = lazy(() => import("pages/CreateGamePage"));
const GamePage = lazy(() => import("pages/GamePage"));
const NotExistingPage = lazy(() => import("pages/404Page"));

const publicRoutes = [
  {
    path: publicPaths.home,
    Component: <HomePage />,
  },
  {
    path: publicPaths.createGame,
    Component: <CreateGamePage />,
  },
  {
    path: publicPaths.game,
    Component: <GamePage />,
  },
];

const App = () => {
  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PublicRoute>{route.Component}</PublicRoute>}
          />
        ))}
        <Route path="*" element={<NotExistingPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
