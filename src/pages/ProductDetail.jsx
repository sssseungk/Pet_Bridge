import useProductItem from "@/utils/useProductItem";
import { useParams } from "react-router-dom";
import { getPbImageURL } from "@/utils/getPbImageUrl";
import minus from '/assets/icons/minus.svg'
import plus from '/assets/icons/plus.svg'

function ProductDetail() {
  const { productTitle } = useParams();
  const { data } = useProductItem(productTitle);

  return (
    <div className="max-w-4xl m-auto bg-pet-bg pt-3 px-5">
      <div className="rounded-2xl">
        <img src={getPbImageURL(data,'photo')} alt="상품사진" className=" m-auto h-64" />
      </div>
      <div className="text-xl pt-5">{data.title}</div>
      <div className="flex justify-between">
        <div className="text-xl pt-5">{data.price}</div>
        <div className="count__btn flex h-[30px] w-[84px] flex-row flex-nowrap end items-center justify-start border-[1px] border-gray-2">
          <button type="button" className="border-0 bg-transparent p-0 ">
            <img src={minus} alt="수량 삭제" />
          </button>
          <span className="count mx-[8px] text-[16px] font-semibold text-black">
            1
          </span>
          <button type="button" className="border-0 bg-transparent p-0">
            <img src={plus} alt="수량 추가" />
          </button>
          </div>
      </div>
      <div className='m-auto h-[1px] bg-black mt-4'></div>
        <img src={getPbImageURL(data,'photo_detail')} alt="상품사진" className=" m-auto pt-4" />


    </div>
  )
}

export default ProductDetail




