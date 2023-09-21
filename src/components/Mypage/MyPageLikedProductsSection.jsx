import MyPageLikedProduct from './MyPageLikedProduct';

function MyPageLikedProductsSection({ userData, isLoading }) {
  return (
    <section className="mt-[3rem] mx-auto w-[50%] min-w-[300px]">
      <h3 className="font-semibold text-lg mb-2">❤️ 내가 찜한 상품</h3>
      <ul>
        {userData && userData.expand && userData.expand.LikedProducts ? (
          userData.expand.LikedProducts.map((item, index) => (
            <MyPageLikedProduct key={index} item={item} />
          ))
        ) : (
          <div>데이터가 없습니다.</div>
        )}
      </ul>
    </section>
  );
}
export default MyPageLikedProductsSection;
