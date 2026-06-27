function FinishTimeDisplay({ finishLoading, finishError, finishTime }) {
  if (finishLoading) return <h3>No Finish Time Yet</h3>;
  if (finishError)
    return <h3>Session Finish Request Failed - Time was not recorded</h3>;

  if (finishTime > 0 && finishTime < 60000)
    return <h3>Finish Time was {finishTime / 1000} seconds</h3>;

  if (finishTime >= 60000)
    return (
      <h3>
        Finish Time was {Math.floor(finishTime / 60000)} min{" "}
        {Math.floor(finishTime % 60000) / 1000} seconds
      </h3>
    );
}

export default FinishTimeDisplay;
