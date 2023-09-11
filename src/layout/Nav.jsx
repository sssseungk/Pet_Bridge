import home from '/assets/icons/home2_icon.svg';
import shop from '/assets/icons/shop2_icon.svg';
import map from '/assets/icons/map2_icon.svg';
import myPage from '/assets/icons/mypage2_icon.svg';


function Nav() {
  return (
    <>
      <nav className="max-w-4xl h-[52px] z-10 bg-pet-bg px-[28px] py-[16px] bottom-0 fixed left-0 right-0 m-auto border shadow-[0_-8px_20px_0_rgba(0,0,0,0.1)]">
        <div className='flex justify-between items-center'>
          <button type="submit" className=''><img src={home} alt='메인' /></button>
          <button type="submit"><img src={shop} alt="쇼핑" /></button>
          <button type="submit"><img src={map} alt="맵" /></button>
          <button type="submit"><img src={myPage} alt="마이페이지" /></button>
        </div>
      </nav>
    </>

    
  )
}

export default Nav