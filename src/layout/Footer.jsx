import './Footer.css';

function Footer() {
  return (
    <div className="font-suit text-xs text-gray-2 bg-gray-1 text-center flex-col gap-6 flex pt-6 pb-13">
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
      <div className="bg-gray-2 text-gray-1 py-3 text-xl font-bold flex items-center justify-center">
        <img src="/src/assets/logo_footer_icon.svg" className="w-5 m-1"></img>
        펫:브릿지
      </div>
    </div>
  );
}

export default Footer;
