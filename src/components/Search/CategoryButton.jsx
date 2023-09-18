import { PropTypes } from 'prop-types';

function CategoryButton({
  buttonId,
  selectedCategory,
  handleClickButton,
  buttonText,
}) {
  return (
    <li
      className={`text-base py-1 px-2 border-gray-1 border-[1px] rounded-[20px] ${
        selectedCategory === buttonId ? 'bg-primary' : ''
      }`}
    >
      <button type="button" onClick={() => handleClickButton(buttonId)}>
        {buttonText}
      </button>
    </li>
  );
}

export default CategoryButton;

CategoryButton.propTypes = {
  buttonId: PropTypes.string,
  selectedCategory: PropTypes.string,
  handleClickButton: PropTypes.func,
  buttonText: PropTypes.string,
};
