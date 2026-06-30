import charactersImage from "../assets/wheres-waldo-characters.jpg";
import styles from "../styles/Characters.module.css";

function Characters() {
  return (
    <>
      <div className={styles.charactersContainer}>
        <img
          src={charactersImage}
          alt="characters"
          className={styles.charactersImage}
        />
      </div>
      <p>
        <b>
          Wally &nbsp; &nbsp; Woof &nbsp; &nbsp; &nbsp; &nbsp; Wendy &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Wizard &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Odlaw
        </b>
      </p>
    </>
  );
}

export default Characters;
