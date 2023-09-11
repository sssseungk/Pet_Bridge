import { useState } from 'react';
import minus from '/assets/icons/minus_icon.svg';
import plus from '/assets/icons/plus_icon.svg';

function CountButton() {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  return (
    <>
      <div className="flex h-7 w-[5.25rem] items-center justify-start border border-gray-500">
        <button type="button" className="border-0 bg-transparent p-0" onClick={decreaseQuantity}>
          <img src={minus} alt="수량 삭제" />
        </button>
        <span className="count mx-[8px] text-[16px] font-semibold text-black">
          {quantity}
        </span>
        <button type="button"  className="border-0 bg-transparent p-0" onClick={increaseQuantity}>
          <img src={plus} alt="수량 추가" />
        </button>
      </div>
    </>
  );
}

export default CountButton;
