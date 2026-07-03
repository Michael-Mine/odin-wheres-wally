import { useState, useEffect } from "react";

const useScores = () => {
  const [scores, setScores] = useState(null);
  const [scoreError, setScoreError] = useState(null);
  const [scoreLoading, setScoreLoading] = useState(true);

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
      .catch((error) => setScoreError(error))
      .finally(() => setScoreLoading(false));
  }, [url]);

  if (scores && scores.length > 5) {
    setScores(scores.slice(0, 5));
  }

  return { scores, scoreError, scoreLoading };
};

export default useScores;
