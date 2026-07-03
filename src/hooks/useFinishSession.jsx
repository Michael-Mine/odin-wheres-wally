import { useState, useEffect } from "react";

const useFinishSession = (sessionId, remainingCharacters) => {
  const [finishTime, setFinishTime] = useState(null);
  const [finishError, setFinishError] = useState(null);
  const [finishLoading, setFinishLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;
  const url = `${apiUrl}sessions/finish`;

  useEffect(() => {
    if (remainingCharacters.length === 0 && !finishTime) {
      fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          return response.json();
        })
        .then((response) => {
          if (response.time) {
            setFinishTime(response.time);
          } else {
            console.log(response);
          }
        })
        .catch((error) => setFinishError(error))
        .finally(() => {
          setFinishLoading(false);
        });
    }
  }, [sessionId, url, remainingCharacters.length, finishTime]);

  return { finishTime, finishError, finishLoading };
};

export default useFinishSession;
