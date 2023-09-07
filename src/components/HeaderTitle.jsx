import prev from '@/assets/prev.svg';
import logo from '@/assets/logo.svg';
import search from '@/assets/search.svg';
import bagoff from '@/assets/bagoff.svg';


function HeaderTitle({title='펫:브릿지', showLogo=false, showSearchIcon=false, showCartIcon=false}) {
  return (
    <>
      <div className="w-full p-5 bg-pet-bg border-gray-800 shadow-lg relative z-10">
        <div className="flex items-center justify-between">
          <button>
            <img src={prev}/>
          </button>
          <h1 className="flex items-center gap-1 font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {showLogo && <img src={logo} className="w-5 h-5"/>}
            {title}
          </h1>
          <div>
            <button className="pr-4">
              {showSearchIcon && <img src={search}/>}
            </button>
            <button>
              {showCartIcon && <img src={bagoff}/>}
            </button>
          </div>
        </div>
      </div>
    </>

  )
}

export default HeaderTitle
