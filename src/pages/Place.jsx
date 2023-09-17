import pb from '@/api/pocketbase';
import PlaceModal from '@/components/Place/PlaceModal';
import getPbImageURL from '@/utils/getPbImageUrl';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PlaceBg from '/assets/imgs/catbg_place.png';
import PlaceHome from '/assets/imgs/pet_house_place.png';
import shelter from '/assets/imgs/shelter_place.png';

function Place() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [placeList, setPlaceList] = useState([]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const renderPlaceList = await pb.collection('place').getFullList();
        setPlaceList(renderPlaceList);
      } catch (error) {
        throw new Error('error');
      }
    }
    fetchPlaces();
  }, []);

  return (
    <>
      <article className="max-w-4xl mx-auto my-0 relative bg-pet-bg">
        <section className="h-[14rem] pet-s:h-[16rem] pet-m:h-[22rem] pet-l:h-[25rem] overflow-hidden transition-[0.3s]">
          <img
            className="w-full object-cover object-center"
            src={PlaceBg}
            alt=""
          />
        </section>
        <section className="relative top-[-4.5rem] mb-[-3.5rem] w-[92%] mx-auto my-0">
          <h2 className="sr-only">내 주변 보호소 찾기</h2>
          <Link
            to={`/map`}
            className="bg-primary text-2xl pet-m:text-4xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex justify-between items-center pl-[6%] pr-[3%] pt-[4%] pb-[3%] rounded-[20px]"
          >
            <p className="font-extrabold md:leading-[2.8rem] w-[55%] transition-[0.3s]">
              <span className="text-xs  mb-[0.3rem] pet-m:text-lg pet-l:text-2xl pet-l:mb-[1.3rem] block font-bold leading-[normal] transition-[0.3s]">
                가까운 곳부터 천천히
              </span>
              내 주변
              <br /> 보호소 찾기
            </p>
            <img className="w-[34%]" src={PlaceHome} alt="" />
          </Link>
        </section>
        <section className="w-[92%] mx-auto my-0">
          <h2 className="font-bold mt-[10%] mb-[3%] mx-0 text-sm pet-m:text-lg pet-l:text-xl transition-[0.3s]">
            추천 보호소
          </h2>
          <div className="bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-[15px] p-[4%]">
            <img className="" src={shelter} alt="" />
            <dl>
              <dt className="text-base font-bold mt-[5%] mb-[2%] mx-0 pet-m:text-lg pet-l:text-2xl transition-[0.3s]">
                고양시 동물보호센터
              </dt>
              <dd className="text-xs pet-m:text-base pet-l:text-lg">
                주소: 경기도 고양시 덕양구 고양대로 1695
              </dd>
            </dl>
            <div className="flex justify-between text-sm mt-[5%]">
              <a
                href="tel:010-4634-4879"
                className="bg-primary rounded-[10px] w-[48%]  mr-[4%] flex justify-center items-center px-0 py-[3%] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] text-sm pet-m:text-base pet-l:text-xl transition-[0.3s]"
              >
                <FontAwesomeIcon
                  icon={faPhone}
                  className="mr-[3%] text-base pet-m:text-base pet-l:text-xl transition-[0.3s]"
                />
                전화하기
              </a>
              <button
                onClick={openModal}
                className="bg-pet-green rounded-[10px] text-white w-[48%] flex justify-center items-center px-0 py-[3%] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] text-sm pet-m:text-base pet-l:text-xl transition-[0.3s]"
              >
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="mr-[5%] text-base pet-m:text-lg pet-l:text-xl transition-[0.3s]"
                />
                위치보기
              </button>
              <div id="portal">
                <PlaceModal isOpen={isModalOpen} onClose={closeModal} />
              </div>
            </div>
          </div>
        </section>
        <section className="w-[92%] mx-auto my-0">
          <h2 className="font-bold mt-[14%] mb-[3%] mx-0 text-sm pet-m:text-lg pet-l:text-xl transition-[0.3s]">
            보호소 사이트 방문하기
          </h2>
          <ul>
            {placeList.map((place) => (
              <li key={place.id}>
                <a
                  href={place.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-full bg-white flex overflow-hidden items-center mb-[5%] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                >
                  <img
                    className="w-[35%] h-auto"
                    src={getPbImageURL(place, 'photo')}
                    alt=""
                  />
                  <dl className="pl-[2.5%] text-left">
                    <dt className="text-sm font-bold mb-[3%] pet-m:text-lg pet-l:text-2xl transition-[0.3s]">
                      {place.title}
                    </dt>
                    <dd className="text-xs pet-m:text-base pet-l:text-lg transition-[0.3s]">
                      주소: {place.address}
                    </dd>
                    <dd className="text-xs pet-m:text-base pet-l:text-lg transition-[0.3s]">
                      Tel : {place.tel}
                    </dd>
                  </dl>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </>
  );
}

export default Place;
