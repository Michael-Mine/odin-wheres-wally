import { useRef, useState } from "react";
import Characters from "../components/Characters";
import spaceStationImage from "../assets/Wheres-Waldo-Space-Station.jpg";
import markerImage from "../assets/marker-check.svg";
import styles from "../styles/SpaceStation.module.css";

function SpaceStation() {
  const [remainingCharacters, setRemainingCharacters] = useState([
    "Wally",
    "Woof",
    "Wendy",
    "Wizard",
    "Odlaw",
  ]);
  const [markersPercent, setMarkersPercent] = useState([
    { char: "Wally", x: 40.57, y: 61.77 },
    { char: "Woof", x: 58.87, y: 90.87 },
    { char: "Wendy", x: 29.47, y: 51.37 },
    { char: "Wizard", x: 78.11, y: 57.74 },
    { char: "Odlaw", x: 7.1, y: 69.14 },
  ]);
  const [markersPixel, setMarkersPixel] = useState([]);
  const [coord, setCoord] = useState([0, 0]);

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  console.log("rendering");
  const targetingBox = useRef(null);
  const selectionBox = useRef(null);

  const handleImageClick = (e) => {
    const target = e.target;

    // Get click position relative to image
    const x = e.pageX - target.offsetLeft;
    const y = e.pageY - target.offsetTop;

    // Normalize to percentage of width and height
    // Multiply by 10000 and divide by 100 to keep 2 decimal places
    const xCoord = Math.floor((x / target.width) * 10000) / 100;
    const yCoord = Math.floor((y / target.height) * 10000) / 100;

    console.log(`Clicked at: X=${xCoord}%, Y=${yCoord}%`);
    setCoord([xCoord, yCoord]);

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
          char: marker.char,
          x: (marker.x * target.width) / 100 + target.offsetLeft + "px",
          y: (marker.y * target.height) / 100 + target.offsetTop - 35 + "px",
        };
      }),
    );
  };

  const handleCharacterSelect = (character) => {
    // targetingBox.current.togglePopover();
    // selectionBox.current.textContent = "checking";
    console.log(character, coord);
    //POST request with character & coord
    setSending(true);

    fetch(apiUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ character, coord }),
    })
      .then((response) => response.json())
      .then((response) => setResponse({ ...response }))
      .catch((error) => setError(error))
      .finally(() => {
        setSending(false);
        targetingBox.current.togglePopover();
      });
  };

  //if sending, add checking message (leave)
  //if response is char & coords, check if in markers and add, setRemainingCharacters
  //if response is empty/message, display incorrect pic temporarily

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
      >
        <div
          className={styles.selectionBox}
          id="selectionBox"
          ref={selectionBox}
          popover="auto"
          anchor="targetingBox"
        >
          <ul className={styles.ul}>
            {remainingCharacters.map((character) => {
              return (
                <li key={character}>
                  <button
                    className={styles.buttons}
                    onClick={() => handleCharacterSelect(character)}
                  >
                    {character}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {markersPixel.map((marker) => {
        return (
          <img
            key={marker.char}
            src={markerImage}
            alt="check marker"
            className={styles.marker}
            style={{ left: marker.x, top: marker.y }}
          ></img>
        );
      })}
    </>
  );
}

export default SpaceStation;
