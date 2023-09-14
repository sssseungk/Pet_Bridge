import sample from '/assets/imgs/Home_dog.png';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function HomeCumulativeAmount(props) {
  return (
    <section className="relative px-5 py-10 bg-primary">
      <h2 className="font-bold">여러분들의 후원으로 이만큼이나 모였어요.</h2>
      <span className="text-sm font-semibold">누적후원금액</span>
      <p className="text-2xl font-black">
        <span>{props.Amount.toLocaleString('ko-KR')}</span>원
      </p>
      <ul className="absolute flex gap-2 right-5 top-5 pet-s:hidden pet-m:flex">
        <li>
          <Link to={`/signin`}>로그인</Link>
        </li>
        <li aria-hidden="true">|</li>
        <li>
          <Link to={`/signup`}>회원가입</Link>
        </li>
      </ul>
      <div
        className="absolute bottom-0 left-0 w-full h-5 bg-white rounded-t-full "
        style={{ boxShadow: '0px -12px 12px rgba(0, 0, 0, 0.08)' }}
      >
        <img
          src={sample}
          alt=""
          className="absolute bottom-2 right-[calc(10%-0.4rem)] "
        />
      </div>
    </section>
  );
}

HomeCumulativeAmount.propTypes = {
  Amount: PropTypes.number.isRequired,
};

export default HomeCumulativeAmount;
