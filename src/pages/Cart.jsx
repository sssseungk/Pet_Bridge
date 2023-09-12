import useProductItem from "@/utils/useProductItem";
import { useParams } from "react-router-dom";
import { getPbImageURL } from "@/utils/getPbImageUrl";
import CountButton from "@/components/ProductDetail/CountButton";
import remove from '/assets/icons/close_icon.svg'

function Cart() {
  const { productTitle } = useParams();
  const { data } = useProductItem(productTitle);

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


        <button className="w-full m-auto h-12 bg-primary rounded-lg items-center mb-3 text-base bottom-16 left-0 right-0 sticky">
          결제하기
        </button>
      </div>
    </>
    
  )
}

export default Cart