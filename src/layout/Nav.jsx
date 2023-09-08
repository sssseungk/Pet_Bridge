import home from '@/assets/icons/home2.svg';
import shop from '@/assets/icons/shop2.svg';
import map from '@/assets/icons/map2.svg';
import myPage from '@/assets/icons/mypage2.svg';


function Nav() {
  return (
    <>
      <nav className="w-full max-w-4xl h-[52px] bg-pet-bg px-[28px] py-[16px] bottom-0 fixed rounded-b-xl left-0 right-0 m-auto border">
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