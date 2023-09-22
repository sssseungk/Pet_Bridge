import { useState, useEffect } from 'react';
import click from '/assets/icons/heart_click_icon.svg';
import unclick from '/assets/icons/heart_unclick_icon.svg';
import pb from '@/api/pocketbase'; // 포켓베이스 API import
import { useAuth } from '@/contexts/Auth'; // Auth context import
import { PropTypes } from 'prop-types';

function Heart({ productId }) {
  const [addWish, setAddWish] = useState(false);
  const { user } = useAuth(); // 현재 로그인한 사용자 정보 가져오기

  useEffect(() => {
    if (!user) return;

    const fetchProductData = async () => {
      try {
        const userData = await pb.collection('users').getOne(user.id);
        setAddWish(userData.LikedProducts.includes(productId));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductData();
  }, [productId, user?.id]);

  const handleWishBtn = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const userData = await pb.collection('users').getOne(user.id);
      let updatedLikedUsers;

      if (addWish) {
        updatedLikedUsers = userData.LikedProducts.filter(
          (id) => id !== productId
        );
      } else {
        updatedLikedUsers = [...userData.LikedProducts, productId];
      }

      await pb
        .collection('users')
        .update(user.id, { LikedProducts: updatedLikedUsers });

      setAddWish(!addWish);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className='flex w-7 h-7'>
      {addWish ? (
        <img src={click} onClick={handleWishBtn} />
      ) : (
        <img src={unclick} onClick={handleWishBtn} />
      )}
    </button>
  );
}

export default Heart;

Heart.propTypes = {
  productId: PropTypes.string.isRequired,
};