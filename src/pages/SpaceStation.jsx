import charactersImage from "../assets/wheres-waldo-characters.jpg";
import spaceStationImage from "../assets/Wheres-Waldo-Space-Station.jpg";
import styles from "../styles/SpaceStation.module.css";

function SpaceStation() {
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
      <img src={spaceStationImage} alt="space station" />
    </>
  );
}

export default SpaceStation;
