import comment from '@/assets/comment.svg';
import heart from '@/assets/heart.svg';
import product1 from '@/assets/product1.png';

function ProductItem() {
  return (
    <div className=' bg-pet-ivory rounded-[10px] '>
      <div className="flex-col items-center justify-center pt-3 px-2">
        <div className="relative">
          <img src={product1} className="bg-pet-bg w-32 h-28 rounded-[10px]"/>
          <img src={heart} className="absolute top-3 right-3"/>
        </div>
        <h1 className="text-[14px] text-pet-black pt-2">베이비슈 리유저블 컵</h1>
        <h2 className="text-[12px] font-semibold text-pet-red pt-1">5,900원</h2>
        <div className="flex gap-1 justify-end pb-1 pt-2">
          <img src={comment}/>
          <span className="text-gray-2 text-[10px]">82</span>
        </div>
      </div>
    </div>
  )
}

export default ProductItem