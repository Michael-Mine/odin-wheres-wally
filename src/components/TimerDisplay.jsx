import TimerCount from "./TimerCount";

function TimerDisplay({
  sessionIdLoading,
  sessionIdError,
  sessionId,
  finishTime,
}) {
  if (sessionIdLoading) return <h3>Loading Timer</h3>;
  if (sessionIdError)
    return <h3>Session Start Failed - Time will not be recorded</h3>;
  if (sessionId && !finishTime) return <TimerCount />;
}

export default TimerDisplay;
