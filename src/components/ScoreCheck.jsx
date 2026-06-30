import useScores from "../hooks/useScores";
import ScoreSubmit from "./ScoreSubmit";
import PropTypes from "prop-types";

function ScoreCheck({ finishTime, sessionId }) {
  const { scores, scoreError, scoreLoading } = useScores();

  if (scoreLoading) return <h4>Checking Scores</h4>;
  if (scoreError) return <h4>Error Checking Scores</h4>;

  if (
    scores &&
    scores.length > 4 &&
    scores.every((item) => item < finishTime)
  ) {
    return <h4>Score did not make leaderboard</h4>;
  }

  return <ScoreSubmit sessionId={sessionId} />;
}

ScoreCheck.propTypes = {
  finishTime: PropTypes.any,
  sessionId: PropTypes.string,
};

export default ScoreCheck;
