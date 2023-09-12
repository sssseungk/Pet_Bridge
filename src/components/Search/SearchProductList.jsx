import { useEffect, useState } from 'react';
import ProductItem from '@/components/ProductList/ProductItem';
import { pb } from '@/api/pocketbase';
import { PropTypes } from 'prop-types';
import product_search_notfound from '/assets/imgs/product_search_notfound.png';
 

function SearchProductList({ selectedCategory, searchTerm }) {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productListData = await pb.collection('product').getFullList();
        setProductList(productListData);
      } catch (error) {
        console.error('Error fetching product list:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = (selectedCategory || searchTerm) // 카테고리 선택이나 검색어가 있는 경우에만 필터링 실행
  ? productList.filter(product => 
      (selectedCategory ? product.category === selectedCategory : true) && 
      (searchTerm ? product.title.includes(searchTerm) : true)
    )
  : []; // 카테고리 선택과 검색어 모두 없는 경우 빈 배열 반환


  
  return (
    <div className="bg-pet-bg pb-16">
      <ol className="bg-pet-bg flex flex-wrap max-w-4xl mx-auto justify-start mt-5 gap-2">
        {filteredProducts.map(product => (
          <ProductItem product={product} key={product.id} />
        ))}
        {searchTerm && filteredProducts.length === 0 && ( // searchTerm 값과 필터된 상품들의 개수가 0인지 확인
          <div className="relative my-0 mx-auto opacity-60 pet-s:pt-16 pet-m:pt-24">
            <img src={product_search_notfound} className="absolute pet-s:w-20 pet-s:top-1 pet-s:left-20 pet-m:w-24 pet-m:top-6 pet-m:left-20"/>
            <p className="text-center font-bold rounded-[10px] px-8 py-5 border-2 border-pet-black

            ">관련 상품이 없다는데...요?</p>
          </div>

        )}
      </ol>
    </div>
  );
}

export default SearchProductList;

SearchProductList.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired, // 이 부분을 추가합니다.
};