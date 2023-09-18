import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import pb from '@/api/pocketbase';
import { useAuth } from '@/contexts/Auth';
import { useEffect } from 'react';
import ProductItemInfo from './ProductItemInfo';
import ProductItemImage from './ProductItemImage';

function ProductItem({ product, reviewCount, selectedCategory = '' }) {
  const { user } = useAuth();
  const [addWish, setAddWish] = useState(false);

  useEffect(() => {
    if (!user) return;
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
      const userData = await pb.collection('users').getOne(user.id);
      let updatedLikedUsers;
      if (!addWish) {
        updatedLikedUsers = [...userData.LikedProducts, product.id];
        setAddWish(true);
      } else {
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

  return (
    <li className="bg-[#FDF6EE] rounded-[10px] pet-s:w-[calc(50%/1-0.25rem)] pet-l:w-[calc(33.3%-0.33rem)] aspect-200/140">
      <Link
        to={`/productlist/detail/${product.id}`}
        onClick={() => window.scrollTo(0, 0)}
      >
        <div className="flex-col items-center justify-center pt-3 px-3">
          <ProductItemImage
            product={product}
            handleWishBtn={handleWishBtn}
            addWish={addWish}
          />
          <ProductItemInfo
            product={product}
            selectedCategory={selectedCategory}
            reviewCount={reviewCount}
          />
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
