import PropTypes from 'prop-types';
import HomeItemCompo from './HomeItemCompo';
import { pb } from '@/api/pocketbase';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function HomeListCompo(props) {
  const [homeList, setHomeList] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const getHomeList = async () => {
      try {
        const homeListData = await pb.collection('place').getFullList();
        setHomeList(homeListData);
      } catch (error) {
        throw new Error('Error fetching place list');
      }
    };
    getHomeList();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 840) {
        setSlidesPerView(7);
      } else if (window.innerWidth >= 720) {
        setSlidesPerView(6);
      } else if (window.innerWidth >= 600) {
        setSlidesPerView(5);
      } else if (window.innerWidth >= 480) {
        setSlidesPerView(4);
      } else if (window.innerWidth >= 360) {
        setSlidesPerView(3);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize); // cleanup function
  }, []);

  return (
    <section className="px-5 py-3 flex gap-3 flex-col">
      <div className="flex justify-between items-center">
        <h2 className="font-bold inline">{props.title}</h2>
        <Link to={`/place`}>
          <span className="text-xs">더보기 &gt; </span>
        </Link>
      </div>

      <Swiper
        className="w-full"
        spaceBetween={20}
        slidesPerView={slidesPerView}
        centeredSlides={false}
        loop={false}
      >
        {homeList?.map((place) => (
          <SwiperSlide key={place.id} className="">
            {/* {console.log(place)} */}
            <HomeItemCompo item={place} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

HomeListCompo.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HomeListCompo;
