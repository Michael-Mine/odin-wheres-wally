import { useEffect, useState } from "react";
import timerIcon from "../assets/timer-outline.svg";
import styles from "../styles/Timer.module.css";

function TimerCount() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const key = setInterval(() => {
      setCounter((count) => count + 1);
    }, 1000);

    return () => {
      clearInterval(key);
    };
  }, []);

  if (counter > 59) {
    return (
      <div className={styles.timerContainer}>
        <img
          src={timerIcon}
          alt="timer icon"
          className={styles.timerIcon}
        ></img>
        <h2 className={styles.timer}>
          {Math.floor(counter / 60)} min {Math.floor(counter % 60)} sec{" "}
        </h2>
      </div>
    );
  }

  return (
    <div className={styles.timerContainer}>
      <img src={timerIcon} alt="timer icon" className={styles.timerIcon}></img>
      <h2 className={styles.timer}>{counter} seconds</h2>
    </div>
  );
}

export default TimerCount;
