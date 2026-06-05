import PropTypes from "prop-types";
import styles from "../styles/RemainingCharactersBox.module.css";
import RemainingCharactersBoxItem from "./RemainingCharactersBoxItem";

function RemainingCharactersBox({
  remainingCharacters,
  handleCharacterSelect,
}) {
  {
    return (
      <ul className={styles.ul}>
        {remainingCharacters.map((character) => {
          return (
            <RemainingCharactersBoxItem
              key={character}
              character={character}
              handleCharacterSelect={handleCharacterSelect}
            />
          );
        })}
      </ul>
    );
  }
}

RemainingCharactersBox.propTypes = {
  remainingCharacters: PropTypes.arrayOf(PropTypes.string),
  handleCharacterSelect: PropTypes.func,
};

export default RemainingCharactersBox;
