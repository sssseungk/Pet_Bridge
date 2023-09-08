import HeaderComp from "@/components/Header/HeaderComp"

function Header() {
  return (
    <header>
      <HeaderComp title="펫:브릿지" showLogo={true} showSearchIcon={true} showCartIcon={true}/>
      <HeaderComp title="장바구니"/>
      <HeaderComp title="유기동물 봉사활동"/>
      <HeaderComp title="내 주변 보호소 찾기"/>
      <HeaderComp title="상품상세정보" showCartIcon={true}/>
      <HeaderComp title="후원 상품" showSearchIcon={true} showCartIcon={true}/>
    </header>
  )
}

export default Header