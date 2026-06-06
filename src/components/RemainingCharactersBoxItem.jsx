import PropTypes from "prop-types";
import styles from "../styles/RemainingCharactersBoxItem.module.css";

function RemainingCharactersBoxItem({ character, handleCharacterSelect }) {
  return (
    <li>
      <button
        className={styles.buttons}
        onClick={() => handleCharacterSelect(character)}
      >
        {character}
      </button>
    </li>
  );
}

RemainingCharactersBoxItem.propTypes = {
  character: PropTypes.string,
  handleCharacterSelect: PropTypes.func,
};

export default RemainingCharactersBoxItem;
