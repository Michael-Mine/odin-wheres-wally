import App from "../App.jsx";
import ErrorPage from "../pages/Error-404.jsx";
import Home from "../pages/Home.jsx";
import Leaderboard from "../pages/Leaderboard.jsx";
import SpaceStation from "../pages/SpaceStation.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "leaderboard", element: <Leaderboard /> },
      { path: "space-station", element: <SpaceStation /> },
    ],
  },
];

export default routes;
