import App from "../App.jsx";
import ErrorPage from "../pages/Error-404.jsx";
import Home from "../pages/Home.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Home /> }],
  },
];

export default routes;
