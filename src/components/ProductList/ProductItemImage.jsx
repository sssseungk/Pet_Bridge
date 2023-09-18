import getPbImageURL from '@/utils/getPbImageUrl';
import heart_empty_icon from '/assets/icons/heart_empty_icon.svg';
import heart_fill_icon from '/assets/icons/heart_fill_icon.svg';
import { PropTypes } from 'prop-types';

function ProductItemImage({ product, handleWishBtn, addWish }) {
  return (
    <div className="relative">
      <img
        src={getPbImageURL(product, 'photo')}
        className="=w-full h-3/2 rounded-[10px] transition-width duration-300"
      />
      <button
        onClick={handleWishBtn}
        className="p-3 transition-all duration-300 hover:scale-125 cursor-pointer absolute pet-m:top-2 pet-m:right-2 pet-l:top-4 pet-l:right-4 top-[0.1rem] right-[0.1rem]"
      >
        {addWish ? (
          <img
            src={heart_fill_icon}
            className="pet-s:w-5 pet-m:w-8 pet-l:w-10"
          />
        ) : (
          <img
            src={heart_empty_icon}
            className="pet-s:w-5 pet-m:w-8 pet-l:w-10"
          />
        )}
      </button>
    </div>
  );
}

export default ProductItemImage;

ProductItemImage.propTypes = {
  product: PropTypes.object.isRequired,
  handleWishBtn: PropTypes.func.isRequired,
  addWish: PropTypes.func.isRequired,
};
