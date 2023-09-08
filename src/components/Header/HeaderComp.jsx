import prev_icon from '@/assets/icons/prev_icon.svg'
import logo_header_icon from '@/assets/icons/logo_header_icon.svg'
import search_icon from '@/assets/icons/search_icon.svg'
import cart_off_icon from '@/assets/icons/cart_off_icon.svg'
import PropTypes from 'prop-types';

function HeaderComp({title='펫:브릿지', showLogo=false, showSearchIcon=false, showCartIcon=false}) {
  return (
    <>
      <div className="max-w-3xl mx-auto p-5 bg-pet-bg border-gray-800 shadow-lg relative z-10">
        <div className="flex items-center justify-between">
          <button>
            <img src={prev_icon}/>
          </button>
          <h1 className="flex items-center gap-1 font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {showLogo && <img src={logo_header_icon} className="w-5 h-5"/>}
            {title}
          </h1>
          <div>
            <button className="pr-4">
              {showSearchIcon && <img src={search_icon}/>}
            </button>
            <button>
              {showCartIcon && <img src={cart_off_icon}/>}
            </button>
          </div>
        </div>
      </div>
    </>

  )
}


export default HeaderComp


HeaderComp.propTypes = {
  title: PropTypes.string,
  showLogo: PropTypes.bool,
  showSearchIcon: PropTypes.bool,
  showCartIcon: PropTypes.bool,
}
