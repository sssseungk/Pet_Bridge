import './Footer.css';
import logo from '@/assets/logo.svg';

function Footer() {
  const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220.09 197.05"><defs><style>.cls-1{fill:#161616;}</style></defs><path class="cls-1" d="m141.29,120.44c-16.74,0-39.57-6.4-47.38-23.88-4.45-9.96-8.14-19.98-10.6-27.15-2.13,6.18-1.37,11.85-1.35,11.93.61,3.9-2.05,7.56-5.96,8.17-3.9.62-7.56-2.05-8.17-5.96-.13-.81-2.96-20.02,11.31-33.39,12.46-11.67,42.46-21.87,45.84-22.99l5.02-1.67,3.06,4.32c5.24,7.35,15.69,18.04,22.49,18.76,5.78.61,12.94,5.13,14.18,23.19.92,13.31-2.09,43.74-17,47.44-3.16.78-7.1,1.21-11.45,1.22Zm-47.14-63.79c1.54,4.86,6.41,19.76,12.81,34.08,6.23,13.93,31.97,17,42.03,14.69,1.68-1.37,5.09-8.65,6.26-21.08,1.13-11.94-.66-19.58-2.04-21.62-11.78-1.73-23.02-13.6-28.5-20.28-8.43,3.09-21.88,8.6-30.58,14.21Zm54.72,48.86h0Z"/><path class="cls-1" d="m48.38,197.05c-10.42,0-20.71-3.99-26.9-6.93-4.22-2.01-18.21-9.19-20.91-17.21-1.2-3.56-1.48-8.9,9.1-31.12,3.36-7.06,6.81-13.68,8.85-17.53-5.19-9.78-12.2-23.83-12.7-29.28-.5-5.42,5.81-24.14,17.21-42.3C33.85,35.47,52.83,12.97,81.88,3.51c50.19-16.34,117.23,28.85,126.85,43.22,3.08,4.6,5,8.52,5.7,14.91.7,6.42-1.6,12.45-2.46,14.73l-.14.38c-.97,2.92-2.66,7.85-4.87,13.79,12.33,13.46,12.8,17.75,12.98,19.38.82,7.52-.6,20.55-22.17,46.8-12.29,14.95-26.24,25.1-33.47,29.82-19.69,12.86-24.62,10.12-26.72,8.95-3.37-1.87-4.82-5.81-3.54-9.58,1.53-4.49-1.24-12.91-2.82-16.29l-2.79-5.97,5.72-3.29c.26-.15,26.56-15.31,38.78-31.61,11.12-14.83,23.07-49.73,25.35-56.57.07-.21.18-.51.33-.91.53-1.39,1.94-5.1,1.61-8.09-.38-3.53-1.22-5.29-3.37-8.5-3.06-4.56-19.81-17.84-42.3-28.06-26.24-11.92-50.47-15.3-68.23-9.52C39.99,32.19,21.27,86.6,20.13,93.91c.9,3.64,7.2,16.61,12.81,26.96l1.85,3.42-1.87,3.42c-8.52,15.56-17.62,34.98-18.52,40.84,4.54,5.43,28,17.85,40.56,13.15,9.32-3.49,20.83-10.42,30.08-16,11.15-6.72,15.19-9.04,18.88-9.11,1.81-.04,11.21.14,17.76,6.85,2.75,2.81,5.95,7.85,5.6,15.87-.17,3.95-3.51,6.99-7.45,6.84-3.95-.17-7.01-3.51-6.84-7.45.15-3.52-1.13-4.83-1.55-5.26-1.67-1.72-4.72-2.42-6.64-2.53-2.12.86-7.78,4.27-12.39,7.05-9.75,5.88-21.9,13.19-32.45,17.15-3.74,1.4-7.68,1.97-11.6,1.97Zm98.11-27.46c.87,2.73,1.73,6.12,2.09,9.71,9.42-5.04,25.42-16.2,38.13-31.67,9.06-11.02,19.61-26.03,19.05-35.61-.62-1.22-2.44-3.69-4.72-6.47-4.87,11.62-10.76,23.87-16.69,31.77-10.51,14.02-28.85,26.57-37.86,32.25Zm-132.54-1.68h0Z"/></svg>`;

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
      <p className="bg-gray-2 text-gray-1 py-3 text-xl font-bold ">
        <span
          dangerouslySetInnerHTML={{ __html: logoSvg }}
          className="w-[21px] inline-block mr-1 my-logo"
        ></span>
        펫:브릿지
      </p>
    </div>
  );
}

export default Footer;
