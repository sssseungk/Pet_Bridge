import cup from '@/assets/imgs/1.jpg';
import minus from '@/assets/icons/minus.svg';
import plus from '@/assets/icons/plus.svg';
import detail1 from '@/assets/imgs/2.jpg';

function ProductDetail() {
  return (
    <>
      <div className="max-w-4xl m-auto bg-pet-bg pt-3 px-5">
        <div className="rounded-2xl">
          <img src={cup} alt="메인" className=" m-auto h-64" />
        </div>
        <div className="text-xl pt-5">베이비슈 내열 리유저블컵</div>
        <div className="flex justify-between">
          <div className="text-[20px]">5,900원</div>
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
        <img src={detail1} alt="메인" className=" m-auto pt-4" />

      </div>
    </>
  );
}

export default ProductDetail;
