import { useLocation } from 'react-router-dom';
import top_icon from '/assets/icons/top_icon.svg';
import logo from '/assets/icons/logo_footer_icon.svg';

function Footer() {
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (location.pathname === '/') {
    return null;
  }
  return (
    <footer className="relative flex flex-col gap-6 pt-6 mx-auto mt-10 text-xs text-center max-w-screen-pet-l font-suit text-gray-2 bg-gray-1 ">
      <button
        onClick={scrollToTop}
        className="fixed pet-s:right-5  pet-l:right-[calc(50%-(428px))] z-50 rounded-full w-14 h-14 border-gray-1 bottom-32 bg-pet-bg"
        style={{
          // transition: '.2s ease-in-out', 움직일때 애니메이션
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', // 그림자 스타일 조정
        }}
      >
        <img src={top_icon} className="mx-auto" alt="최상단 가기" />
      </button>
      <p>
        <span className="font-semibold">COMPANY:</span> 펫브릿지스튜디오 <br />
        <span className="font-semibold">ADDRESS:</span> 서울 종랑구 연목로 42길
        11 (럭키빌딩) 306호 <br />
        <span className="font-semibold">
          BUSINESS NUMBER:
        </span> 010-0000-0000 <br />
        <span className="font-semibold">CONTACT:</span> catdog141000@gmail.com
      </p>
      <p>
        Copyright ⓒ 2023 동물의 삶을 더 밝게, 유기동물스튜디오
        <br />
        All rights reserved.
      </p>
      <div className="flex items-center justify-center py-3 pb-16 text-xl font-bold bg-gray-2 text-gray-1">
        <img src={logo} className="w-5 m-1"></img>
        펫:브릿지
      </div>
    </footer>
  );
}

export default Footer;
