function Nav() {
  return (
    <ul className="bg-pet-bg font-bold flex gap-4 px-8 justify-between flex-wrap pt-6 border-gray-1 relative">
      <li className="border-pet-orange border-b-2 z-10 text-pet-orange py-2 xs:w-auto">베스트</li>
      <li className="py-2 xs:w-auto">신상품</li>
      <li className="py-2 xs:w-auto">전체</li>
      <li className="py-2 xs:w-auto">무료배송</li>
      <div className="absolute bottom-0 left-0 w-full border-gray-1 border-b-2"></div>
    </ul>
  )
}

export default Nav