import ProductItem from '@/components/ProductList/ProductItem';
import ProductListNav from './../components/ProductList/ProductListNav';
import pb from '@/api/pocketbase';
import { useEffect } from 'react';
import { useState } from 'react';
import Spinner from '@/components/Common/Spinner';
import { useRef } from 'react';

function ProductList() {
  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [reviewCounts, setReviewCounts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const isFirstMountRef = useRef(true);
  let displayProducts = productList;

  useEffect(() => {
    const getProductList = async () => {
      try {
        setIsLoading(true);
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
        throw new Error('Error fetching product list');
      } finally {
        setIsLoading(false);
      }
    };
    getProductList();

    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
    }
  }, []);

  if ((isFirstMountRef.current && !productList.length) || isLoading) {
    return (
      <div className="grid place-content-center h-full">
        <Spinner size={120} className="mt-8" />
      </div>
    );
  }

  if (selectedCategory === '무료배송') {
    displayProducts = productList.filter((product) => product.delivery_free);
  } else if (selectedCategory === '신상품') {
    displayProducts = productList
      .slice()
      .sort((a, b) => b.product_date.localeCompare(a.product_date))
      .slice(0, 7);
  } else if (selectedCategory === '베스트') {
    displayProducts = productList
      .slice()
      .sort((a, b) => b.total_sale - a.total_sale)
      .slice(0, 10);
  } else {
    displayProducts = productList;
  }

  return (
    <div className="max-w-screen-pet-l my-0 mx-auto">
      <ProductListNav onCategorySelect={setSelectedCategory} />
      <ul className="list-none px-2 flex flex-wrap max-w-screen-pet-l mx-auto justify-start mt-5 gap-2">
        {displayProducts.map((product) => (
          <ProductItem
            product={product}
            key={product.id}
            reviewCount={reviewCounts[product.id]}
            selectedCategory={selectedCategory}
          />
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
