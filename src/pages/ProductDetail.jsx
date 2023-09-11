import useProductItem from "@/utils/useProductItem";
import { useParams } from "react-router-dom";
import { getPbImageURL } from "@/utils/getPbImageUrl";
import minus from '/assets/icons/minus_icon.svg'
import plus from '/assets/icons/plus_icon.svg'

function ProductDetail() {
  const { productTitle } = useParams();
  const { data } = useProductItem(productTitle);

  return (
    <div className="max-w-4xl m-auto pt-3 px-5">
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
        <div className='m-auto h-[1px] bg-black mt-4 mb-2'></div>

        <div className="bg-pet-bg h-auto flex-shrink-0 rounded-2xl shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)] mb-6">
          <div className="justify-center py-4 px-6">
            <div className="flex justify-between pb-5 text-lg">
              <p className="font-semibold">
                조스마
              </p>
              <p className="font-semibold">2023.09.05</p>
            </div>
            <p className="text-xl">
            프로젝트하면서 계속 물마시는 일이 많아졌는데 동물그림이 그려져있어서 굉장히 귀엽고 또 동물을위한 후원도 할수있다는 점에서 구매했습니다 너무 좋아요!!!
           </p>
          </div>        
        </div>

        <div className="bg-pet-bg h-auto flex-shrink-0 rounded-2xl shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)] mb-6">
          <div className="justify-center py-4 px-6">
            <div className="flex justify-between pb-5 text-lg">
              <p className="font-semibold">
                김서기
              </p>
              <p className="font-semibold">2023.09.05</p>
            </div>
            <p className="text-xl">
            텀블러가 너무 귀엽고 후원도 된다고 해서 한 번 사봤는데 너무 유용하게 잘 쓰고 있어요! 너무 좋은 앱인것 같아요 ^^!
           </p>
          </div>        
        </div>
        <button className="w-full h-12 bg-pet-orange rounded-lg items-center text-sm">
          장바구니
        </button>
    </div>
  )
}

export default ProductDetail