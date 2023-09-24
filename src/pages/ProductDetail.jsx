import useProductItem from '@/utils/useProductItem';
import { useParams, Link } from 'react-router-dom';
import getPbImageURL from '@/utils/getPbImageUrl';
import Heart from '@/components/ProductDetail/Heart';
import { useState, useEffect } from 'react';
import pb from '@/api/pocketbase';
import { useAuth } from '@/contexts/Auth';
import toast from 'react-hot-toast';
import Navigation from '@/components/ProductDetail/Navigation';
import QuantitySelector from '@/components/ProductDetail/QuantitySelector';
import ReviewItem from '@/components/ProductDetail/ReviewItem';
import { Helmet } from 'react-helmet-async';

function ProductDetail() {
  const { user } = useAuth();
  const { productTitle } = useParams();
  const { data } = useProductItem(productTitle);
  const [quantity, setQuantity] = useState(1);

  const increaseCount = () => {
    setQuantity(quantity + 1);
  };

  const decreaseCount = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    if (!user) return;
    const fetchCart = async () => {
      try {
        const cartData = await pb
          .collection('userCart')
          .getFullList(`userName="${user.name}"`);
        const relatedCarts = cartData.filter(
          (item) => item.userName === user.name
        );
        console.log(relatedCarts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, [user?.id]);

  const handleAddCart = async () => {
    if (!user) {
      toast('로그인이 필요합니다.', {
        position: 'top-right',
        icon: '🚨',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      return;
    }
    try {
      const userCartItems = await pb
        .collection('userCart')
        .getFullList(`userId="${user.id}"`);

      const existingCartItem = userCartItems.find(
        (item) => item.productId === data.id && item.userId === user.id
      );

      if (existingCartItem) {
        toast('이미 추가된 상품입니다.', {
          position: 'top-right',
          icon: '🚨',
          ariaProps: {
            role: 'alert',
            'aria-live': 'polite',
          },
        });
        return;
      }

      const newCartData = await pb.collection('userCart').create({
        userId: user.id,
        userName: user.name,
        productId: data.id,
        quantity: quantity,
      });

      console.log(newCartData);

      const expandedCartData = await pb
        .collection('userCart')
        .getFullList(`userName="${user.name}"`);
      console.log(expandedCartData);

      const cartData = await pb
        .collection('userCart')
        .getFullList(`userName="${user.name}"`);
      const relatedCarts = cartData.filter(
        (item) => item.userName === user.name
      );
      let userRelatedCarts = relatedCarts.map((item) => item.id);
      await pb
        .collection('users')
        .update(user.id, { userCart: userRelatedCarts });
      toast('상품이 추가되었습니다.', {
        position: 'top-right',
        icon: '🛒',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>펫:브릿지 - 상품 상세페이지</title>
      </Helmet>
      <div className="max-w-screen-pet-l m-auto pt-3">
        <img
          id="productDescription"
          src={getPbImageURL(data, 'photo')}
          alt="상품사진"
          className="m-auto h-auto px-5"
        />
        <div className="flex justify-between px-5">
          <div className="text-xl pt-5">{data.title}</div>
          <div className="flex mt-5">
            <Heart productId={productTitle} />
            <div className="ml-4">
              <QuantitySelector
                quantity={quantity}
                increaseCount={increaseCount}
                decreaseCount={decreaseCount}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between pb-4 px-5">
          {data.price ? (
            <div className="text-lg mt-4">
              {data.price.toLocaleString('ko-KR')} 원
            </div>
          ) : (
            <div className="text-xl pt-5">가격 정보 없음</div>
          )}
          <button
            id="addCart"
            onClick={handleAddCart}
            className="bg-primary w-32 h-9 rounded-xl mt-3"
          >
            장바구니 추가
          </button>
        </div>
        <h2 className="sr-only">상세페이지 네비</h2>
        <Navigation />
        <h2 className="sr-only">상세정보 이미지</h2>
        <img
          id="productDetails"
          src={getPbImageURL(data, 'photo_detail')}
          className="m-auto py-4 border-b px-5"
          alt="상품사진"
        />
        <h2 className="text-2xl my-3 mx-4 bg-pet-bg">리뷰</h2>
        <ReviewItem />
        <Link to={`/cart`} onClick={() => window.scrollTo(0, 0)}>
          <button className="w-full m-auto h-12 bg-primary rounded-lg items-center mb-3 text-base bottom-16 left-0 right-0 sticky px-5">
            장바구니
          </button>
        </Link>
      </div>
    </>
  );
}

export default ProductDetail;
