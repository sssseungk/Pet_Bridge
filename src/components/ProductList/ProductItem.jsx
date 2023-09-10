import { useEffect } from 'react';
import comment_icon from '/assets/icons/comment_icon.svg';
import heart_empty_icon from '/assets/icons/heart_empty_icon.svg';
import heart_fill_icon from '/assets/icons/heart_fill_icon.svg';
import { useState } from 'react';
import {pb} from '@/api/pocketbase';
import { getPbImageURL } from '@/utils/getPbImageUrl';
import { PropTypes } from 'prop-types';

const renderProductList = await pb.collection('product').getFullList();
function ProductItem({product}) {

  useEffect(() => {
    try {
      renderProductList;
    } catch (error){
      throw new Error('error');
    }
  }, []);

  const [addWish, setAddWish] = useState(false);
  const handleWishBtn = () => {
    setAddWish(!addWish);
  }

  return (
    <div className='bg-[#FDF6EE] bg-pet-ivory rounded-[10px] w-full pet-360:w-[calc(50%/1-1rem)] pet-864:w-[calc(50%-1rem)] aspect-200/140'>
      <div className="flex-col items-center justify-center pt-3 px-3">
        <div className="relative">
          <img src={getPbImageURL(product,'photo')} className="w-full h-3/2 rounded-[10px] transition-width duration-300"/>
          {
            addWish ? (
              <img src={heart_fill_icon} onClick={handleWishBtn} className="transition-all duration-300 hover:scale-125 cursor-pointer absolute pet-520:w-8 pet-520:top-4 pet-520:right-3 pet-864:w-12 pet-864:top-7 pet-864:right-6 top-[0.75rem] right-[0.75rem]"/>
            ) : (
              <img src={heart_empty_icon} onClick={handleWishBtn} className="transition-all duration-300 hover:scale-125 cursor-pointer absolute pet-520:w-8 pet-520:top-4 pet-520:right-3 pet-864:w-12 pet-864:top-7 pet-864:right-6 top-[0.75rem] right-[0.75rem]"/>
            )
          }
        </div>
        <h1 className="transition-all duration-300 pet-520:text-base pet-864:text-2xl text-[12px] text-pet-black pt-2">{product.title}</h1>
        <h2 className="transition-all duration-300 pet-520:text-sm pet-864:text-xl text-[10px] font-bold text-pet-red pt-1">{product.price.toLocaleString('ko-KR')}원</h2>
        <div className="flex gap-1 justify-end pb-1 pt-2 pet-864:gap-2 pet-864:pr-3 pet-864:pb-3">
          <img src={comment_icon} className="transition-all duration-300 pet-520:w-4 pet-864:w-5"/>
          <span className="transition-all duration-300 text-gray-2 text-[8px] pet-520:text-sm pet-864:text-2xl">82</span>
        </div>
      </div>
    </div>
  )
}

export default ProductItem


ProductItem.propTypes = {
  product: PropTypes.object,
}