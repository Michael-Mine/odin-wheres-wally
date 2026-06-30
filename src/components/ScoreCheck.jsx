import { useEffect, useState } from "react";
import ScoreSubmit from "./ScoreSubmit";

function ScoreCheck({ finishTime, sessionId }) {
  // call getLeaderBoard to return top 5 scores saved
  const [scores, setScores] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;
  const url = `${apiUrl}scores/space-station`;

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => setScores(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [url]);

  console.log(scores);

  if (scores && scores.length > 5) {
    setScores(scores.slice(0, 5));
  }

  if (
    scores &&
    scores.length > 4 &&
    scores.every((item) => item > finishTime)
  ) {
    return <h4>Score did not make leaderboard</h4>;
  }

  return <ScoreSubmit sessionId={sessionId} />;
}

export default ScoreCheck;
