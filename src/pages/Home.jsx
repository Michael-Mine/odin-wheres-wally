import { Link } from "react-router";

function Home() {
  return (
    <>
      <h2>The classic Where's Wally game</h2>
      <h3>Find all the characters as fast as you can!</h3>
      <p>How to play:</p>
      <ul>
        <li>When you find a character, click it in the image.</li>
        <li>Choose which character from the popup list.</li>
        <br />
        <li>Top 10 quickest times are recorded on leaderboard.</li>
        <li>Suitable for desktop only.</li>
      </ul>
      <div className="links">
        <Link to="/leaderboard">
          <button>Leaderboard</button>
        </Link>
        <Link to="/space-station">
          <button>Load Image</button>
        </Link>
      </div>
    </>
  );
}

export default Home;
