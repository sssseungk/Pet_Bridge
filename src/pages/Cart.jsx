import { useState } from 'react';


function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // 상품을 장바구니에 추가하는 함수
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // 장바구니에서 상품을 제거하는 함수
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  // 총 가격 계산 함수
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div>
      <h2>장바구니</h2>
      {cartItems.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <p>{item.price}원</p>
              <button onClick={() => removeFromCart(item.id)}>제거</button>
            </div>
          ))}
          <p>총 가격: {calculateTotalPrice()}원</p>
        </>
      )}
      
      {/* 상품 목록 */}
      <h2>상품 목록</h2>
      {/* 상품 데이터를 가져와서 렌더링 */}
      {/* 각각의 상품에 "장바구니에 추가" 버튼을 추가하고 addToCart 함수를 호출 */}
    </div>
  );
}

export default Cart;