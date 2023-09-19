import { useEffect, useState } from 'react';
import ProductItem from '@/components/ProductList/ProductItem';
import pb from '@/api/pocketbase';
import { PropTypes } from 'prop-types';
import product_search_notfound from '/assets/imgs/product_search_notfound.png';

function SearchProductList({ selectedCategory, searchTerm }) {
  const [productList, setProductList] = useState([]);
  const [reviewCounts, setReviewCounts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productListData = await pb.collection('product').getFullList();
        setProductList(productListData);
        const reviewsData = await pb.collection('reviews').getFullList();

        let counts = {};
        for (let product of productListData) {
          counts[product.id] = reviewsData.filter(
            (review) => review.product_title === product.title
          ).length;
        }
        setReviewCounts(counts);
      } catch (error) {
        console.error('Error fetching product list:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory || searchTerm
      ? productList.filter(
          (product) =>
            (selectedCategory ? product.category === selectedCategory : true) &&
            (searchTerm ? product.title.includes(searchTerm) : true)
        )
      : [];

  return (
    <ul className="px-2 flex flex-wrap max-w-4xl mx-auto justify-start mt-5 gap-2">
      {filteredProducts.map((product) => (
        <ProductItem
          product={product}
          key={product.id}
          reviewCount={reviewCounts[product.id]}
        />
      ))}
      {searchTerm && filteredProducts.length === 0 && (
        <div className="relative my-0 mx-auto opacity-60 pet-s:pt-16 pet-m:pt-24">
          <img
            src={product_search_notfound}
            alt="찾을 수 없는 상품"
            className="absolute pet-s:w-20 pet-s:top-1 pet-s:left-20 pet-m:w-24 pet-m:top-6 pet-m:left-20"
          />
          <p className="text-center font-bold rounded-[10px] px-8 py-5 border-2 border-pet-black">
            관련 상품이 없다는데...요?
          </p>
        </div>
      )}
    </ul>
  );
}

export default SearchProductList;

SearchProductList.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
};
