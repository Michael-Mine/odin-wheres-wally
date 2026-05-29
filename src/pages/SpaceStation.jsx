import { useState } from "react";
import spaceStationImage from "../assets/Wheres-Waldo-Space-Station.jpg";
import Characters from "../components/Characters";
import styles from "../styles/SpaceStation.module.css";

function SpaceStation() {
  const [remainingCharacters, setremainingCharacters] = useState([
    "Wally",
    "Woof",
    "Wendy",
    "Wizard",
    "Odlaw",
  ]);
  const [coord, setCoord] = useState([0, 0]);
  console.log("rendering");
  const box = document.getElementById("selectionBox");

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

    box.style.top = e.pageY + "px";
    box.style.left = e.pageX + "px";
    box.togglePopover();
  };

  const handleCharacterSelect = (character) => {
    box.togglePopover();
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
        className={styles.box}
        id="selectionBox"
        popover="auto"
        anchor="spaceStationImage"
      >
        <ul>
          {remainingCharacters.map((character) => {
            return (
              <li key={character}>
                <button onClick={() => handleCharacterSelect(character)}>
                  {character}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default SpaceStation;
