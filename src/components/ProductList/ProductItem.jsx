import comment_icon from '/assets/icons/comment_icon.svg';
import heart_empty_icon from '/assets/icons/heart_empty_icon.svg';
import heart_fill_icon from '/assets/icons/heart_fill_icon.svg';
import { useState } from 'react';
import getPbImageURL from '@/utils/getPbImageUrl';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import pb from '@/api/pocketbase';
import { useAuth } from '@/contexts/Auth';
import { useEffect } from 'react';

function ProductItem({ product, reviewCount, selectedCategory }) {
  const { user } = useAuth();
  const [addWish, setAddWish] = useState(false);

  useEffect(() => {
    // 로그인 안했으면 바로 반환
    if (!user) return;
    // 포켓베이스에서 product 데이터 가져옴
    const fetchProductData = async () => {
      try {
        const userData = await pb.collection('users').getOne(user.id);
        if (userData.LikedProducts.includes(product.id)) {
          setAddWish(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductData();
  }, [user?.id]);

  const handleWishBtn = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    try {
      // 현재 사용자 데이터 가져오기
      const userData = await pb.collection('users').getOne(user.id);
      let updatedLikedUsers;
      // 하트버튼이 눌렸을 때 기존 찜목록에 추가로 상품 추가
      if (!addWish) {
        updatedLikedUsers = [...userData.LikedProducts, product.id];
        setAddWish(true);
      } else {
        // 하트가 취소된 상태이면
        updatedLikedUsers = userData.LikedProducts.filter(
          (productId) => productId !== product.id
        );
        setAddWish(false);
      }
      await pb
        .collection('users')
        .update(user.id, { LikedProducts: updatedLikedUsers });
    } catch (error) {
      console.log(error);
    }
  };

  let categoryLabels = [];
  if (
    new Date(product.product_date) >= new Date('2023-08-01') &&
    selectedCategory !== '신상품'
  ) {
    categoryLabels.push('신상품');
  }
  if (product.total_sale > 1200 && selectedCategory !== '베스트') {
    categoryLabels.push('베스트');
  }
  if (product.delivery_free && selectedCategory !== '무료배송') {
    categoryLabels.push('무료배송');
  }
  if (categoryLabels.length === 0) {
    categoryLabels.push('');
  }

  return (
    <li className="bg-[#FDF6EE] rounded-[10px] pet-s:w-[calc(50%/1-0.25rem)] pet-l:w-[calc(33.3%-0.33rem)] aspect-200/140">
      <Link
        to={`/productlist/detail/${product.id}`}
        onClick={() => window.scrollTo(0, 0)}
      >
        <div className="flex-col items-center justify-center pt-3 px-3">
          <div className="relative">
            <img
              src={getPbImageURL(product, 'photo')}
              className="=w-full h-3/2 rounded-[10px] transition-width duration-300"
            />
            <button
              onClick={handleWishBtn}
              className="transition-all duration-300 hover:scale-125 cursor-pointer absolute pet-m:top-5 pet-m:right-5 pet-l:top-7 pet-l:right-6 top-[0.75rem] right-[0.75rem]"
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
          <span className="block text-ellipsis whitespace-nowrap overflow-hidden transition-all duration-300 pet-m:text-base pet-l:text-xl text-[12px] text-pet-black pt-2">
            {product.title}
          </span>
          <span className="block transition-all duration-300 pet-m:text-sm pet-l:text-lg text-[10px] font-bold text-pet-red pt-1">
            {product.price.toLocaleString('ko-KR')}원
          </span>
          {categoryLabels.map((label) => {
            let labelClass;
            switch (label) {
              case '신상품':
                labelClass = 'bg-pet-orange';
                break;
              case '베스트':
                labelClass = 'bg-pet-red';
                break;
              case '무료배송':
                labelClass = 'bg-pet-green';
                break;
              default:
                labelClass = '';
            }
            return (
              <span
                key={label}
                className={`mr-1 inline-block px-1 py-[1px] text-[8px] pet-m:text-[14px] rounded-sm font-bold text-pet-bg ${labelClass}`}
              >
                {label}
              </span>
            );
          })}

          <div className="flex gap-1 justify-end pb-1 pt-2 pet-l:gap-2 pet-l:pr-3 pet-l:pb-3">
            <img
              src={comment_icon}
              className="transition-all duration-300 w-3 pet-m:w-4 pet-l:w-4"
            />
            <span className="transition-all duration-base text-gray2 text-xs sm:text-sm lg:text-base">
              {reviewCount || '0'}
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
  reviewCount: PropTypes.number,
  selectedCategory: PropTypes.string,
};
