import comment_icon from '/assets/icons/comment_icon.svg';
import heart_empty_icon from '/assets/icons/heart_empty_icon.svg';
import heart_fill_icon from '/assets/icons/heart_fill_icon.svg';
import { useState } from 'react';
import { getPbImageURL } from '@/utils/getPbImageUrl';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

function ProductItem({ product }) {
  const [addWish, setAddWish] = useState(false);
  const handleWishBtn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAddWish(!addWish);
  };

  return (
    <li className="bg-[#FDF6EE] rounded-[10px] w-full pet-s:w-[calc(50%/1-0.25rem)] pet-l:w-[calc(33.3%-0.33rem)] aspect-200/140">
      <Link to={`/productlist/detail/${product.id}`} onClick={() => window.scrollTo(0, 0)}>
        <div className="flex-col items-center justify-center pt-3 px-3">
          <div className="relative">
            <img
              src={getPbImageURL(product, 'photo')}
              className="pet-s:h-36 pet-m:h-52 pet-l:h-64 w-full h-3/2 rounded-[10px] transition-width duration-300"
            />
            {addWish ? (
              <img
                src={heart_fill_icon}
                onClick={handleWishBtn}
                className="transition-all duration-300 hover:scale-125 cursor-pointer absolute pet-m:w-8 pet-m:top-4 pet-m:right-3 pet-l:w-10 pet-l:top-7 pet-l:right-6 top-[0.75rem] right-[0.75rem]"
              />
            ) : (
              <img
                src={heart_empty_icon}
                onClick={handleWishBtn}
                className="transition-all duration-300 hover:scale-125 cursor-pointer absolute pet-m:w-8 pet-m:top-4 pet-m:right-3 pet-l:w-10 pet-l:top-7 pet-l:right-6 top-[0.75rem] right-[0.75rem]"
              />
            )}
          </div>
          <span className="block text-ellipsis whitespace-nowrap overflow-hidden transition-all duration-300 pet-m:text-base pet-l:text-xl text-[12px] text-pet-black pt-2">
            {product.title}
          </span>
          <span className="block transition-all duration-300 pet-m:text-sm pet-l:text-lg text-[10px] font-bold text-pet-red pt-1">
            {product.price.toLocaleString('ko-KR')}원
          </span>
          <div className="flex gap-1 justify-end pb-1 pt-2 pet-l:gap-2 pet-l:pr-3 pet-l:pb-3">
            <img
              src={comment_icon}
              className="transition-all duration-300 w-3 pet-m:w-4 pet-l:w-4"
            />
            <span className="transition-all duration-300 text-gray-2 text-xs pet-m:text-sm pet-l:text-base">
              82
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ProductItem;

ProductItem.propTypes = {
  product: PropTypes.object,
};