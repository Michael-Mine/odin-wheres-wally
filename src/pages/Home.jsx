import { Link } from "react-router";
import Characters from "../components/Characters";

function Home() {
  return (
    <>
      <h2>The classic Where's Wally game</h2>
      <Characters />
      <h3>Find all the characters as fast as you can!</h3>
      <p>How to play:</p>
      <ul>
        <li>
          When you find a character, click it in the image and choose the
          character.
        </li>
        <br />
        <li>Top 5 quickest times are recorded on leaderboard.</li>
        <br />
        <li>Suitable for desktop only.</li>
      </ul>
      <div className="links">
        <Link to="/space-station">
          <button>Load Game</button>
        </Link>
        <Link to="/leaderboard">
          <button>Leaderboard</button>
        </Link>
      </div>
    </>
  );
}

export default Home;
