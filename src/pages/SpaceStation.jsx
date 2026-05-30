import { useRef, useState } from "react";
import Characters from "../components/Characters";
import spaceStationImage from "../assets/Wheres-Waldo-Space-Station.jpg";
import markerImage from "../assets/marker-check.svg";
import styles from "../styles/SpaceStation.module.css";

function SpaceStation() {
  const [remainingCharacters, setremainingCharacters] = useState([
    "Wally",
    "Woof",
    "Wendy",
    "Wizard",
    "Odlaw",
  ]);
  const [markers, setMarkers] = useState([
    { char: "Wally", x: 40.57, y: 61.77 },
    { char: "Woof", x: 58.87, y: 90.87 },
    { char: "Wendy", x: 29.47, y: 51.37 },
    { char: "Wizard", x: 78.11, y: 57.74 },
    { char: "Odlaw", x: 7.1, y: 69.14 },
  ]);
  const [coord, setCoord] = useState([0, 0]);

  console.log("rendering");
  const image = document.getElementById("spaceStationImage");
  const targetingBox = useRef(null);
  const selectionBox = useRef(null);

  const handleImageClick = (e) => {
    const target = e.target;
    console.log(target);

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
  };

  const handleCharacterSelect = (character) => {
    targetingBox.current.togglePopover();
    selectionBox.current.togglePopover();
    console.log("click");
    //POST request with character & coord
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
      {markers.map((marker) => {
        return (
          <img
            key={marker.char}
            src={markerImage}
            alt="check marker"
            className={styles.marker}
            style={{
              left: (marker.x * image.width) / 100 + image.offsetLeft + "px",
              top:
                (marker.y * image.height) / 100 + image.offsetTop - 35 + "px",
            }}
          ></img>
        );
      })}
    </>
  );
}

export default SpaceStation;
