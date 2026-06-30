import { Outlet } from "react-router";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import "./styles/button.css";

function App() {
  return (
    <>
      <Navbar />
      <h1>Mr Mine - Where's Wally Game</h1>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;

// leaderboard page

//tests

// Wendy
