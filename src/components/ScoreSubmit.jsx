import { useState } from "react";
import { Link } from "react-router";
import "../styles/input.css";

function ScoreSubmit({ sessionId }) {
  const [username, setUsername] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const url = `${apiUrl}scores/space-station`;

  const sendScore = () => {
    console.log("sending score");
    setSending(true);

    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sessionId, username }),
    })
      .then((response) => response.json())
      .then((response) => setResponse({ ...response }))
      .catch((error) => setError(error))
      .finally(() => setSending(false));
  };

  if (sending) return <h4>Sending...</h4>;
  if (response && response.message === "Score saved!")
    return (
      <>
        <h4>{response.message}</h4>
        <Link to="/leaderboard">
          <button>Leaderboard</button>
        </Link>
      </>
    );

  return (
    <>
      <h4>Add name to submit high score!</h4>
      <form>
        <div className="input-container">
          <label htmlFor="title">Name:</label>
          <input
            className="input-field"
            id="title"
            name="title"
            data-testid="title-input"
            type="text"
            required={true}
            minLength={3}
            maxLength={15}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <button type="submit" onClick={sendScore}>
            Submit
          </button>
        </div>
      </form>
      {error && <h4>A network error was encountered</h4>}
      {response && <h4>{response[0].msg || response.message}</h4>}
    </>
  );
}

export default ScoreSubmit;
