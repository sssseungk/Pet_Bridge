import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import pb from '@/api/pocketbase';
import getPbImageURL from '@/utils/getPbImageUrl';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
// import './styles.css';
import { Autoplay, Pagination } from 'swiper/modules';

function HomeBenner(props) {
  const [homeBenner, setHomeBenner] = useState([]);

  useEffect(() => {
    const getHomeBenner = async () => {
      try {
        const homeBennerData = await pb.collection('banner').getFullList();
        setHomeBenner(homeBennerData);
      } catch (error) {
        throw new Error('Error fetching place list');
      }
    };
    getHomeBenner();
  }, []);

  return (
    <section className="flex flex-col gap-3 px-5 py-3">
      <div className="flex items-center justify-between">
        <h2 className="inline font-bold">{props.title}</h2>
        <Link to={`/productlist`} onClick={() => window.scrollTo(0, 0)}>
          <span className="text-xs">더보기 &gt; </span>
        </Link>
      </div>

      <Swiper
        className="w-full mySwiper rounded-xl"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
      >
        {/* Map each place to a swiper slide */}
        {homeBenner?.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div style={{ width: '100%', height: '150px', overflow: 'hidden' }}>
              <img
                src={getPbImageURL(banner, 'img')}
                alt="Banner"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

HomeBenner.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HomeBenner;
