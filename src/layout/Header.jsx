import Nav from "./nav"
import HeaderTitle from './../components/HeaderTitle';
import ProductList from './ProductList';


// title='펫:브릿지', showLogo=false, showSearchIcon=false, showCartIcon=false

function Header() {

  return (
    <header>
      {/*
        <HeaderTitle title="펫:브릿지" showLogo={true} showSearchIcon={true} showCartIcon={true}/>
        <HeaderTitle title="장바구니"/>
        <HeaderTitle title="유기동물 봉사활동"/>
        <HeaderTitle title="내 주변 보호소 찾기"/>
        <HeaderTitle title="상품상세정보" showCartIcon={true}/>
      */}
      <HeaderTitle title="후원 상품" showSearchIcon={true} showCartIcon={true}/>
      <Nav/>
      <ProductList/>
    </header>
  )
}

export default Header