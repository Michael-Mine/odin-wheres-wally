import { Link } from "react-router";

function Leaderboard() {
  // fetch data
  return (
    <>
      <h2>Leaderboard</h2>
      <Link to="/">
        <button>Back</button>
      </Link>
    </>
  );
}

export default Leaderboard;
