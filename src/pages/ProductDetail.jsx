import useProductItem from "@/utils/useProductItem";
import { useParams } from "react-router-dom";
import { getPbImageURL } from "@/utils/getPbImageUrl";
import Heart from "@/components/ProductDetail/Heart";
import CountButton from "@/components/ProductDetail/CountButton";
import { Link } from 'react-router-dom';    



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
        <div className="text-xl pt-5">{data.price} 원</div>
        
        <div className="flex items-center gap-4">
          <button>
            <Heart/>
          </button>
          <CountButton/>
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
        <Link to={`/Cart`} >
          <button className="w-full m-auto h-12 bg-pet-orange rounded-lg items-center mb-3 text-sm bottom-16 left-0 right-0 sticky">
            장바구니
          </button>
        </Link>
    </div>
  )
}

export default ProductDetail