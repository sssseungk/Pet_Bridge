import { useState } from 'react';
import { PropTypes } from 'prop-types';

function ProductListNav({onCategorySelect}) {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  return (
    <ul className="max-w-4xl mx-auto bg-pet-bg font-bold flex gap-4 justify-evenly flex-wrap pt-6 border-gray-1 relative">
      <li
        className={`cursor-pointer ${selectedCategory === '전체' ? 'border-pet-orange border-b-2 z-10 text-pet-orange' : ''} py-2 xs:w-auto`}
        onClick={() => handleCategoryClick('전체')}
      >
        전체
      </li>
      <li
        className={`cursor-pointer ${selectedCategory === '신상품' ? 'border-pet-orange border-b-2 z-10 text-pet-orange' : ''} py-2 xs:w-auto`}
        onClick={() => handleCategoryClick('신상품')}
      >
        신상품
      </li>
      <li
        className={`cursor-pointer ${selectedCategory === '베스트' ? 'border-pet-orange border-b-2 z-10 text-pet-orange' : ''} py-2 xs:w-auto`}
        onClick={() => handleCategoryClick('베스트')}
      >
        베스트
      </li>
      <li
        className={`cursor-pointer ${selectedCategory === '무료배송' ? 'border-pet-orange border-b-2 z-10 text-pet-orange' : ''} py-2 xs:w-auto`}
        onClick={() => handleCategoryClick('무료배송')}
      >
        무료배송
      </li>
      <div className="absolute bottom-0 left-0 w-full border-gray-1 border-b-2"></div>
    </ul>
  );
}

export default ProductListNav


ProductListNav.propTypes = {
  onCategorySelect: PropTypes.func.isRequired,
};