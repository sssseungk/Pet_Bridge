import getPbImageURL from '@/utils/getPbImageUrl';
import remove from '/assets/icons/close_icon.svg';
import { useState } from 'react';
import nocash from '/assets/imgs/product_search_notfound.png';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/Auth';
import pb from '@/api/pocketbase';
import minus from '/assets/icons/minus_icon.svg';
import plus from '/assets/icons/plus_icon.svg';

function Cart() {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const [userData, setUserData] = useState(null); // userData 상태 추가
  const [counts, setCounts] = useState([]); // 각 상품의 수량 배열로 관리

  useEffect(() => {
    const fetchCartItem = async () => {
      try {
        // 현재 로그인한 사용자 정보 ( 장바구니 포함 )
        const data = await pb
          .collection('users')
          .getOne(user.id, { expand: 'AddCart' });
        setUserData(data);

        // 초기 수량 설정
        if (data && data.expand?.AddCart) {
          const initialCounts = new Array(data.expand?.AddCart.length).fill(1);
          setCounts(initialCounts);
        }
      } catch (error) {
        console.error('Error fetching cart items: ', error);
      }
    };
    fetchCartItem();
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
    if (userData && userData.expand?.AddCart) {
      // 제거할 아이템 ID
      const itemIdToRemove = userData.expand?.AddCart[index].id;

      // 새로운 AddCart 배열 생성 (제거할 아이템 ID 제외)
      const updatedAddCart = userData.expand?.AddCart.filter(
        (item) => item.id !== itemIdToRemove
      );

      try {
        // 서버에 요청하여 실제 데이터 업데이트
        await pb
          .collection('users')
          .update(user.id, { AddCart: updatedAddCart.map((item) => item.id) });

        // UI 갱신을 위해 userData 및 counts 상태 업데이트

        let updatedCounts = [...counts];
        updatedCounts.splice(index, 1); // counts 배열에서도 해당 인덱스의 아이템 수량 정보 삭제
        setCounts(updatedCounts);

        setUserData({
          ...userData,
          expand: { ...userData.expand, AddCart: updatedAddCart },
        });
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    }
  };

  // 배송비 계산 함수
  const calculateShippingFee = () => {
    let totalPrice = calculateTotalPrice();

    return totalPrice >= 50000 ? 0 : 2500;
  };

  // 총 가격 계산 함수
  const calculateTotalPrice = () => {
    let totalPrice = 0;

    if (userData && userData.expand?.AddCart) {
      userData.expand?.AddCart.forEach((item, index) => {
        totalPrice += item.price * counts[index];
      });

      return totalPrice;
    }

    return totalPrice
  };
  return (
    <>
      <div className="max-w-screen-pet-l h-auto m-auto px-5">
        
{userData && userData.expand?.AddCart.length > 0 ? (
  userData.expand?.AddCart.map((item, index) => (
            <div
              key={index}
              className="h-auto bg-pet-bg mt-14 rounded-xl mb-6 shadow-[4px_4px_8px_0_rgba(0,0,0,0.16)]"
            >
              <div className="px-4 py-5 flex justify-start relative">
                <img
                  src={getPbImageURL(item, 'photo')}
                  alt="상품"
                  className="w-14 h-14 bg-black"
                />
                <div className="pl-4">
                  <div>
                    <div className="text-xl">{item.title}</div>
                    <div className="text-lg">
                      {item.price.toLocaleString('ko-KR')}원
                    </div>
                  </div>
                  <button
                    className="absolute top-4 right-4"
                    onClick={() => removeItem(index)}
                  >
                    <img src={remove} alt="제거버튼" />
                  </button>
                  <div className="absolute right-4 top-12">
                    <div className="flex items-center border">
                      <button onClick={() => decreaseCount(index)}>
                        <img src={minus} alt="빼기" />
                      </button>
                      <span className="px-3">{counts[index]}</span>
                      <button onClick={() => increaseCount(index)}>
                        <img src={plus} alt="추가" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
          ) : (
            <div className="text-center mt-10">
              장바구니에 담긴 상품이 없습니다.
            </div>
          )}
         

        <div className="mt-20 flex justify-between">
          <p>상품금액</p>
          <p>{calculateTotalPrice().toLocaleString('ko-KR')}원</p>
        </div>
        <div className="mt-3 mb-6 flex justify-between">
          <p>배송비</p>
          <p>{calculateShippingFee().toLocaleString('ko-KR')}원</p>
        </div>
        <div className="m-auto h-[1px] bg-black mt-4 mb-2"></div>
        <div className="mt-2 mb-5 flex justify-between">
          <p>총합계</p>
          <p>
            {(calculateTotalPrice() + calculateShippingFee()).toLocaleString(
              'ko-KR'
            )}
            원
          </p>
        </div>
        <button
          className="w-full m-auto h-12 bg-primary rounded-lg items-center mb-3 text-base bottom-16 left-0 right-0"
          onClick={() => setShowModal(true)}
        >
          결제하기
        </button>

        {showModal && (
          <div className="fixed left-[40%] w-80 top-[35%] m-auto p-6 origin-center bg-pet-bg z-[1000] rounded-2xl">
            <p>
              기능 및 페이지가 구현되지 않았습니다. <br /> 확장을 준비중입니다!
            </p>
            <img
              src={nocash}
              alt="모르겠어용"
              className="relative left-[17%]"
            />
            <button
              className="w-full m-auto bg-primary rounded-lg text-lg"
              onClick={() => setShowModal(false)}
            >
              닫기
            </button>
          </div>
        )}

        {showModal && (
          <div
            className="fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.7)] z-[999]"
            onClick={() => setShowModal(false)}
          />
        )}
      </div>
    </>
  );
}

export default Cart;
