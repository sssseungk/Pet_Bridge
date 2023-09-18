import PropTypes from 'prop-types';
import mainDog from '/assets/imgs/mainDog_about.png';
function About(props) {
  return (
    <div className="mx-auto max-w-screen-pet-l ">
      {/* 메인 */}
      <section className="relative">
        <h2>
          About
          <br />
          Pet:Bridge
        </h2>

        <p className="text-2xl font-black">
          <span className="text-sm font-semibold">누적후원금액</span>
          <br />
          <span>{props.Amount.toLocaleString('ko-KR')}</span>원{' '}
        </p>
        <p>
          펫:브릿지는 순이익 전액을 &quot;유기동물과 사랑으로 이어주기&quot;
          위해 사용하고 있습니다.
        </p>
        <img src={mainDog} className="absolute top-0 right-0" />
      </section>

      {/* 유기동물을 사랑으로 */}
      <section>
        <h2>유기동물을 사랑으로</h2>
        {/* <div> 이미지 삽입 </div> */}
        <p>
          펫:브릿지는 유기동물의 복지와 보호를 힘씁니다. 유기동물의 입양을
          장려하고 유기동물 인식개선을 위해 노력합니다. 또한, 동물 보호소와의
          파트너십을 구축하여 함께 협력합니다. 유기동물들에게 새로운 가정과
          사랑으로 가득한 삶을 제공하기 위해 노력합니다.
        </p>
      </section>
      {/* 후원 동참하기 */}
      <section>
        <ul>
          <li>
            <img src="" alt="" />
          </li>
          <li>
            <img src="" alt="" />
          </li>
          <li>
            <img src="" alt="" />
          </li>
          <li>
            <img src="" alt="" />
          </li>
        </ul>
      </section>
      {/* 어떻게 전액 후원이 가능한가요 */}
      <section></section>
      {/* 멤버소개 */}
      <section></section>
    </div>
  );
}

About.propTypes = {
  Amount: PropTypes.number.isRequired,
};

export default About;
