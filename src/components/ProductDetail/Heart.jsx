import { useState } from 'react';
import click from '/assets/icons/heart_click_icon.svg';
import unclick from '/assets/icons/heart_unclick_icon.svg';
import pb from '@/api/pocketbase';
import { useAuth } from '@/contexts/Auth';
import { useEffect } from 'react';
import { PropTypes } from 'prop-types';

function Heart({ productId }) {
  const [addWish, setAddWish] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchProductData = async () => {
      try {
        const productData = await pb.collection('product').getOne(productId);
        setAddWish(productData.Liked.includes(user.id));
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
      const productData = await pb.collection('product').getOne(productId);
      let updatedLikedUsers;

      if (addWish) {
        updatedLikedUsers = productData.Liked.filter((id) => id !== user.id);
      } else {
        updatedLikedUsers = [...productData.Liked, user.id];
      }

      await pb
        .collection('product')
        .update(productId, { Liked: updatedLikedUsers });

      setAddWish(!addWish);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {addWish ? (
        <img src={click} onClick={handleWishBtn} />
      ) : (
        <img src={unclick} onClick={handleWishBtn} />
      )}
    </div>
  );
}

export default Heart;

Heart.propTypes = {
  productId: PropTypes.string.isRequired,
};