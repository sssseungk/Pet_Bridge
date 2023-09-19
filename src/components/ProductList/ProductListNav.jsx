import { useState } from 'react';
import { PropTypes } from 'prop-types';

function ProductListNav({ onCategorySelect }) {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  const categories = ['전체', '신상품', '베스트', '무료배송'];

  return (
    <ul className="max-w-4xl mx-auto bg-pet-bg font-bold flex gap-4 justify-evenly flex-wrap pt-2 border-gray-1 relative">
      {categories.map((category) => (
        <li key={category} className="">
          <button onClick={() => handleCategoryClick(category)}>
            <span
              className={`relative cursor-pointer block ${
                selectedCategory === category
                  ? 'border-pet-orange border-b-4 z-10 text-pet-orange'
                  : ''
              } py-2 xs:w-auto`}
            >
              {category}
            </span>
          </button>
        </li>
      ))}
      <div className="absolute bottom-0 left-0 w-full border-gray-1 border-b-2"></div>
    </ul>
  );
}

export default ProductListNav;

ProductListNav.propTypes = {
  onCategorySelect: PropTypes.func.isRequired,
};
