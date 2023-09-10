import useProductItem from "@/utils/useProductItem";
import { useParams } from "react-router-dom";
import { getPbImageURL } from "@/utils/getPbImageUrl";

function ProductDetail() {
  const { productTitle } = useParams();
  const { data } = useProductItem(productTitle);

  return (
    <div className="max-w-4xl m-auto bg-pet-bg pt-3 px-5">
      <div className="rounded-2xl">
        <img src={getPbImageURL(data,'photo')} alt="상품사진" className=" m-auto h-64" />
      </div>
      <div className="text-xl pt-5">{data.title}</div>
      <div className="text-xl pt-5">{data.price}</div>
      <div className="">
        <img src={getPbImageURL(data,'photo_detail')} alt="상품사진" className=" m-auto" />
      </div>

    </div>
  )
}

export default ProductDetail




