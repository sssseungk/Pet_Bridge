import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/Auth';
import pb from '@/api/pocketbase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import CartItem from '@/components/Cart/CartItem';
import Modal from '@/components/Cart/Modal';

function Cart() {
  const { user } = useAuth();
  const [counts, setCounts] = useState([]); // 각 상품의 수량 배열로 관리
  const [cartData, setCartData] = useState([]); // cartData 상태 추가
  const [isLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoggingOut) {
      toast('로그인 후 이용해 주세요.', {
        position: 'top-right',
        icon: '🙇‍♀️',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });
      navigate('/signin');
    }
    const fetchCartItemAndCartData = async () => {
      try {
        // 현재 로그인한 사용자 정보 ( 장바구니 포함 )
        const cartdata = await pb
          .collection('userCart')
          .getFullList({ expand: 'productId' });
        const data = cartdata.filter((item) => item.userName === user.name);
        setCartData(data);

        if (data.length > 0) {
          const initialCounts = data.map((item) => item.quantity || 1); // 서버에서 제공하는 quantity 값으로 초기화
          setCartData(data);
          setCounts(initialCounts);
        }
      } catch (error) {
        console.error('Error fetching cart items: ', error);
      }
    };
    fetchCartItemAndCartData();
  }, []);

  // 특정 인덱스의 수량 증가 함수
  const increaseCount = (index) => {
    const newCounts = [...counts];
    newCounts[index]++;
    setCounts(newCounts);
  };

  // 특정 인덱스의 수량 감소 함수
  const decreaseCount = (index) => {
    if (counts[index] > 1) {
      const newCounts = [...counts];
      newCounts[index]--;
      setCounts(newCounts);
    }
  };

  // 특정 인덱스의 상품 삭제 함수
  const removeItem = async (index) => {
    if (cartData && cartData[index]) {
      // 제거할 아이템 ID
      const itemIdToRemove = cartData[index].id;
      // 사용자에게 확인 메시지 표시
      const confirmDelete = window.confirm('상품을 삭제하시겠습니까?');

      // 만약 사용자가 '취소' 버튼을 눌렀다면, 여기서 함수 종료
      if (!confirmDelete) return;

      try {
        // 서버에 요청하여 실제 데이터 업데이트
        await pb.collection('userCart').delete(itemIdToRemove);

        // UI 갱신을 위해 cartData 및 counts 상태 업데이트
        let updatedCounts = [...counts];
        updatedCounts.splice(index, 1); // counts 배열에서도 해당 인덱스의 아이템 수량 정보 삭제
        setCounts(updatedCounts);

        let updatedCartData = [...cartData];
        updatedCartData.splice(index, 1);
        setCartData(updatedCartData);
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    }
    toast('상품이 삭제되었습니다.', {
      position: 'top-right',
      icon: '🗑',
      ariaProps: {
        role: 'alert',
        'aria-live': 'polite',
      },
    });
  };

  // 배송비 계산 함수
  const calculateShippingFee = () => {
    let totalPrice = calculateTotalPrice();

    if (totalPrice === 0) {
      return 0;
    }

    return totalPrice >= 50000 ? 0 : 2500;
  };

  // 총 가격 계산 함수
  const calculateTotalPrice = () => {
    let totalPrice = 0;

    if (cartData) {
      cartData.forEach((item, index) => {
        totalPrice += item.expand.productId.price * counts[index];
      });

      return totalPrice;
    }

    return totalPrice;
  };
  return (
    <>
      <h2 className="max-w-screen-pet-l h-auto m-auto px-5">
        {cartData.length > 0 ? (
          cartData.map((item, index) => (
            <CartItem
              key={item.id}
              item={item}
              count={counts[index]}
              index={index}
              removeItem={removeItem}
              decreaseCount={decreaseCount}
              increaseCount={increaseCount}
            />
          ))
        ) : (
          <div className="text-center mt-10">
            장바구니에 담긴 상품이 없습니다.
            <br /> 상품 꾹꾹 눌러담아 주세요오오오옹!!
          </div>
        )}

        <div className="mt-20 flex justify-between">
          <p>상품금액</p>
          <p>{calculateTotalPrice().toLocaleString('ko-KR')} 원</p>
        </div>
        <div className="mt-3 mb-6 flex justify-between">
          <p>배송비</p>
          <p>{calculateShippingFee().toLocaleString('ko-KR')} 원</p>
        </div>
        <div className="m-auto h-[1px] bg-black mt-4 mb-2"></div>
        <div className="mt-2 mb-5 flex justify-between">
          <p>총합계</p>
          <p>
            {(calculateTotalPrice() + calculateShippingFee()).toLocaleString(
              'ko-KR'
            )}{' '}
            원
          </p>
        </div>
        <Modal />
      </h2>
    </>
  );
}

export default Cart;
