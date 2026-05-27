import charactersImage from "../assets/wheres-waldo-characters.jpg";
import spaceStationImage from "../assets/Wheres-Waldo-Space-Station.jpg";
import styles from "../styles/SpaceStation.module.css";

function SpaceStation() {
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
  };

  return (
    <>
      <h2>Space Station</h2>
      <div className={styles.charactersContainer}>
        <img
          src={charactersImage}
          alt="characters"
          className={styles.charactersImage}
        />
      </div>
      <p>
        <b>
          Wally &nbsp; &nbsp; Woof &nbsp; &nbsp; &nbsp; Wenda &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; Wizard &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; Odlaw
        </b>
      </p>
      <img
        src={spaceStationImage}
        alt="space station"
        onClick={handleImageClick}
      />
    </>
  );
}

export default SpaceStation;
