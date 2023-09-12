import home from '/assets/icons/home2_icon.svg';
import shop from '/assets/icons/shop2_icon.svg';
import map from '/assets/icons/map2_icon.svg';
import myPage from '/assets/icons/mypage2_icon.svg';
import { Link } from 'react-router-dom';



function Nav() {
  return (
    <>
      <nav className="max-w-4xl h-[52px] z-10 bg-pet-bg px-[28px] py-[16px] bottom-0 fixed left-0 right-0 m-auto border shadow-[0_-8px_20px_0_rgba(0,0,0,0.1)]">
        <div className='flex justify-between items-center'>
          <Link><button><img src={home} alt='메인' /></button></Link>
          <Link to={`/productlist`}><button><img src={shop} alt="쇼핑" /></button></Link>
          <Link to={`/place`}><button><img src={map} alt="장소" /></button></Link>
          <Link><button><img src={myPage} alt="마이페이지" /></button></Link>
        </div>
      </nav>
    </>
  )
}

export default Nav