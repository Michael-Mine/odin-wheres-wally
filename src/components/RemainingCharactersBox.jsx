import styles from "../styles/RemainingCharactersBox.module.css";

function RemainingCharactersBox({
  remainingCharacters,
  handleCharacterSelect,
}) {
  {
    return (
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
    );
  }
}

export default RemainingCharactersBox;
