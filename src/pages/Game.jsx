import { useRef, useState } from "react";
import useSessionId from "../hooks/useSessionId";
import useFinishSession from "../hooks/useFinishSession";
import Characters from "../components/Characters";
import RemainingCharactersBox from "../components/RemainingCharactersBox";
import TimerDisplay from "../components/TimerDisplay";
import FinishTimeDisplay from "../components/FinishTimeDisplay";
import ScoreCheck from "../components/ScoreCheck";

import spaceStationImage from "../assets/Wheres-Waldo-Space-Station.jpg";
import markerIcon from "../assets/marker-check.svg";
import crossIcon from "../assets/alpha-x-circle-outline.svg";
import styles from "../styles/Game.module.css";

function Game() {
  const [remainingCharacters, setRemainingCharacters] = useState([
    "Wally",
    "Woof",
    "Wendy",
    "Wizard",
    "Odlaw",
  ]);
  const [coord, setCoord] = useState([0, 0]);
  const [crossPosition, setCrossPosition] = useState(["0px", "0px"]);
  const [markersPercent, setMarkersPercent] = useState([]);
  const [markersPixel, setMarkersPixel] = useState([]);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
    offsetLeft: 0,
    offsetTop: 0,
  });

  const { sessionId, sessionIdError, sessionIdLoading } = useSessionId(1);
  const { finishTime, finishError, finishLoading } = useFinishSession(
    sessionId,
    remainingCharacters,
  );

  const targetingBox = useRef(null);
  const selectionBox = useRef(null);
  const cross = useRef(null);

  const handleImageClick = (e) => {
    cross.current.style.display = "none";

    const target = e.target;

    setImageDimensions({
      width: target.width,
      height: target.height,
      offsetLeft: target.offsetLeft,
      offsetTop: target.offsetTop,
    });
    // Get click position relative to image
    const x = e.pageX - target.offsetLeft;
    const y = e.pageY - target.offsetTop;

    // Normalize to percentage of width and height
    // Multiply by 10000 to store integer in db from 0 to 10000
    const xCoord = Math.floor((x / target.width) * 10000);
    const yCoord = Math.floor((y / target.height) * 10000);

    setCoord([xCoord, yCoord]);
    setCrossPosition([e.pageX + "px", e.pageY + "px"]);

    targetingBox.current.style.left = e.pageX + "px";
    targetingBox.current.style.top = e.pageY + "px";
    targetingBox.current.togglePopover();

    selectionBox.current.style.left = e.pageX + "px";
    selectionBox.current.style.top = e.pageY + "px";
    selectionBox.current.togglePopover();

    // reset marker positions if image was resized
    setMarkersPixel(
      markersPercent.map((marker) => {
        return {
          char: marker.name,
          x: (marker.xCoord * target.width) / 10000 + target.offsetLeft + "px",
          y:
            (marker.yCoord * target.height) / 10000 +
            target.offsetTop -
            35 +
            "px",
        };
      }),
    );
  };

  const handleCharacterSelect = (character) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const url = `${apiUrl}games/coords`;

    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        gameId: 1,
        character,
        xCoord: coord[0],
        yCoord: coord[1],
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.name) {
          setMarkersPercent([...markersPercent, response]);
          setMarkersPixel([
            ...markersPixel,
            {
              char: response.name,
              x:
                (response.xCoord * imageDimensions.width) / 10000 +
                imageDimensions.offsetLeft +
                "px",
              y:
                (response.yCoord * imageDimensions.height) / 10000 +
                imageDimensions.offsetTop -
                35 +
                "px",
            },
          ]);
          const updatedCharacters = remainingCharacters.filter((item) => {
            return item !== response.name;
          });
          setRemainingCharacters(updatedCharacters);
        } else {
          cross.current.style.display = "inline";
        }
      })
      .catch((error) => console.log(error))
      .finally(() => targetingBox.current.togglePopover());
  };

  return (
    <>
      <h2>Space Station</h2>
      <Characters />
      <img
        src={spaceStationImage}
        alt="space station"
        id="spaceStationImage"
        onClick={handleImageClick}
      />
      <div
        className={styles.targetingBox}
        id="targetingBox"
        ref={targetingBox}
        popover="auto"
        anchor="spaceStationImage"
        data-testid="targeting-box"
      >
        <div
          className={styles.selectionBox}
          id="selectionBox"
          ref={selectionBox}
          popover="auto"
          anchor="targetingBox"
          data-testid="selection-box"
        >
          <RemainingCharactersBox
            remainingCharacters={remainingCharacters}
            handleCharacterSelect={handleCharacterSelect}
          />
        </div>
      </div>
      {markersPixel.map((marker) => {
        return (
          <img
            key={marker.char}
            src={markerIcon}
            alt="check marker"
            className={styles.marker}
            style={{ left: marker.x, top: marker.y }}
          ></img>
        );
      })}
      <img
        src={crossIcon}
        alt="cross marker"
        ref={cross}
        className={styles.cross}
        style={{ left: crossPosition[0], top: crossPosition[1] }}
      ></img>

      <TimerDisplay
        sessionIdLoading={sessionIdLoading}
        sessionIdError={sessionIdError}
        sessionId={sessionId}
        finishTime={finishTime}
      />

      <FinishTimeDisplay
        finishLoading={finishLoading}
        finishError={finishError}
        finishTime={finishTime}
      />

      {finishTime && (
        <ScoreCheck finishTime={finishTime} sessionId={sessionId} />
      )}
    </>
  );
}

export default Game;
