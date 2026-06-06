import { useEffect, useState } from "react";
import styles from "../styles/Timer.module.css";

function Timer() {
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
      <h2 className={styles.timer}>
        {Math.floor(counter / 60)} min {Math.floor(counter % 60)} sec{" "}
      </h2>
    );
  }

  return <h2 className={styles.timer}>{counter} sec</h2>;
}

export default Timer;
