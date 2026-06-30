import { Link } from "react-router";
import useScores from "../hooks/useScores";
import formatTime from "../utils/formatTime";
import "../styles/Leaderboard.module.css";

function Leaderboard() {
  const { scores, scoreError, scoreLoading } = useScores();

  if (scoreLoading) return <h4>Checking Scores</h4>;
  if (scoreError) return <h4>Error Checking Scores</h4>;

  return (
    <>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        {scores.map((item, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{item.username}</td>
              <td>{formatTime(item.time)}</td>
            </tr>
          );
        })}
      </table>
      <Link to="/">
        <button>Home</button>
      </Link>
    </>
  );
}

export default Leaderboard;
