import PropTypes from 'prop-types';
import { pb } from '@/api/pocketbase';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getPbImageURL } from '@/utils/getPbImageUrl';
import 'swiper/css';

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
    <section className="px-5 py-3">
      <div className="flex justify-between items-center">
        <h2 className="font-bold inline">{props.title}</h2>
        <Link to={`/productlist`}>
          <span className="text-xs">더보기 &gt; </span>
        </Link>
      </div>

      <Swiper
        className="w-full"
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides={false}
        loop={false}
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
