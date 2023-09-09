import { useLocation } from 'react-router-dom';
import HeaderComp from "@/components/Header/HeaderComp"

function Header() {
  const location = useLocation();
  let title, showLogo, showSearchIcon, showCartIcon;

  switch(location.pathname) {
    case '/cart':
      title = "장바구니";
      break;
    case '/place':
      title = "유기동물 봉사활동";
      break;
    case '/productdetail':
      title = "상품상세정보";
      showCartIcon = true;
      break;
    case '/productlist':
      title = "후원 상품";
      showSearchIcon = true;
      showCartIcon = true;
      break; 
    // Add more cases for other paths
    default:
      title = "펫:브릿지";
      showLogo = true;
  }

  return (
    <header>
        <HeaderComp 
            title={title} 
            showLogo={showLogo} 
            showSearchIcon={showSearchIcon} 
            showCartIcon={showCartIcon}
        />
     </header>
   )
}

export default Header