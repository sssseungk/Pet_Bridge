import { pb } from '@/api/pocketbase';
import { getPbImageURL } from '@/utils/getPbImageUrl';
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import callIcon from "/assets/icons/call_icon.svg";
import PlaceIcon from "/assets/icons/place_icon.svg";
import PlaceBg from "/assets/imgs/catbg_place.png";
import PlaceHome from "/assets/imgs/pet_house_place.png";
import shelter from "/assets/imgs/shelter_place.png";

const renderPlaceList = await pb.collection('place').getFullList();

function Place() {
  
  useEffect(() => {
    try{
      renderPlaceList;
    } catch(error){
      throw new Error('error');
    }
  }, []);

  return (
    <>
      <article className="max-w-4xl mx-auto my-0 relative bg-pet-bg">
        <img className="w-full object-cover object-center" src={PlaceBg} alt="" />
        <section className=" relative top-[-3.5rem] mb-[-3.5rem] w-[92%] mx-auto my-0">
          <h2 className="sr-only">내 주변 보호소 찾기</h2>
          <Link to={`/map`} className="bg-primary text-2xl md:text-4xl lg:text-5xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex justify-between items-center pl-[6%] pr-[3%] pt-[4%] pb-[3%] rounded-[20px]">
            <p className="font-extrabold leading-[1.8rem] md:leading-[2.8rem] w-[55%] transition-[0.3s]">
              <span className="text-xs md:text-lg lg:text-2xl block font-bold leading-[normal] transition-[0.3s] mb-[0.3rem]">가까운 곳부터 천천히</span>
              내 주변<br/> 보호소 찾기
            </p>
            <img className="w-[34%]" src={PlaceHome} alt="" />
            </Link>
        </section>
        <section className="w-[92%] mx-auto my-0">
          <h2 className="font-bold mt-[14%] mb-[3%] mx-0">추천 보호소</h2>
          <div className="bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-[15px] p-[4%]">
            <img className="" src={shelter} alt="" />
            <dl>
              <dt className="text-base font-bold mt-[5%] mb-[2%] mx-0">고양시 동물보호센터</dt>
              <dd className="text-xs ">주소: 경기도 고양시 덕양구 고양대로 1695</dd>
            </dl>
            <div className="flex justify-between text-sm mt-[5%]">
              <a href="tel:010-4634-4879" className="bg-primary rounded-[10px] w-[48%] flex justify-center items-center px-0 py-[3%] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <img className="inline-block w-[13%] mr-[5%]" src={callIcon} alt="" />
                전화하기
              </a>
              <a href="" className="bg-pet-green rounded-[10px] text-white w-[48%] flex justify-center items-center px-0 py-[3%] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <img className="inline-block w-[11%] mr-[5%]" src={PlaceIcon} alt="" />
                위치보기
              </a>
            </div>
          </div>
        </section>
        <section className="w-[92%] mx-auto my-0 pb-[25%]">
          <h2 className="font-bold mt-[14%] mb-[3%] mx-0 text-sm">더보기</h2>
          <ul>
            {renderPlaceList.map(place => (
              <li key={place.id}>
                <button className="bg-white flex overflow-hidden items-center mb-[5%] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                  <img className="w-[35%] h-auto" src={getPbImageURL(place,'photo')} alt="" />
                  <dl className="pl-[2.5%] text-left">
                    <dt className="text-sm font-bold mb-[3%]">{place.title}</dt>
                    <dd className="text-xs">주소: {place.address}</dd>
                    <dd className="text-xs">Tel : {place.tel}</dd>
                  </dl>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </>
  )
}

export default Place