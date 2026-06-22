import { useState, useEffect } from "react";

const useSessionId = (gameId) => {
  const [sessionId, setSessionId] = useState(null);
  const [sessionIdError, setSessionIdError] = useState(null);
  const [sessionIdLoading, setSessionIdLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;
  const url = `${apiUrl}sessions/start`;

  useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ gameId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => setSessionId(response.sessionId))
      .catch((error) => setSessionIdError(error))
      .finally(() => setSessionIdLoading(false));
  }, [gameId, url]);

  return { sessionId, sessionIdError, sessionIdLoading };
};

export default useSessionId;
