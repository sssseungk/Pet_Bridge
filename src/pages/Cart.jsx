import useProductItem from "@/utils/useProductItem";
import { useParams } from "react-router-dom";
import { getPbImageURL } from "@/utils/getPbImageUrl";
import CountButton from "@/components/ProductDetail/CountButton";
import remove from '/assets/icons/close_icon.svg'
import { useState } from 'react';
import nocash from '/assets/imgs/product_search_notfound.png'

function Cart() {
  const { productTitle } = useParams();
  const { data } = useProductItem(productTitle);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="max-w-screen-pet-l m-auto px-5">
        <div className="h-24 bg-pet-bg mt-14 rounded-xl mb-6 shadow-[4px_4px_8px_0_rgba(0,0,0,0.16)]">
          <div className="px-4 py-5 flex justify-start relative">
            <img src={getPbImageURL(data,'photo')} alt="상품" className="w-20 h-16 bg-black"/>
            <div className="pl-4">
              <div className="">
                <div className="text-xl">{data.title}제품명</div>
                <div className="text-lg">{data.price}0,000원</div>
                </div>
                <button className="absolute top-4 right-4">
                  <img src={remove} alt="제거버튼" />
                </button>
                <div className="absolute right-4 top-12">
                  <CountButton/>
                </div>
                
            </div> 
          </div>
        </div>
        <div className="mt-20 flex justify-between">
          <p>상품금액</p>
          <p>0,000원</p>
        </div>
        <div className="mt-3 mb-6 flex justify-between">
          <p>배송비</p>
          <p>0,000원</p>
        </div>
        <div className='m-auto h-[1px] bg-black mt-4 mb-2'></div>
        <div className="mt-2 mb-5 flex justify-between">
          <p>총합계</p>
          <p>0,000원</p>
        </div>

        <button className="w-full m-auto h-12 bg-primary rounded-lg items-center mb-3 text-base bottom-16 left-0 right-0 sticky" onClick={() => setShowModal(true)}>
          결제하기
        </button>

      {showModal && (
        <div className="fixed left-[40%] w-80 top-[35%] m-auto p-6 origin-center bg-pet-bg z-[1000] rounded-2xl">
          <p>기능 및 페이지가 구현되지 않았습니다. <br/> 확장을 준비중입니다!</p>
          <img src={nocash} alt="모르겠어용" className="relative left-[17%]" />
          <button className="w-full m-auto bg-primary rounded-lg text-lg" onClick={() => setShowModal(false)}>닫기</button>
        </div>
      )}

      {showModal && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.7)] z-[999]" onClick={() => setShowModal(false)} />)}</div>
    </>
  )
}


export default Cart;