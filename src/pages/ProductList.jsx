import ProductItem from "@/components/ProductList/ProductItem"
import ProductListNav from './../components/ProductList/ProductListNav';
import {pb} from '@/api/pocketbase';
import { useEffect } from "react";
import { useState } from "react";


function ProductList() {
  const [productList, setProductList] = useState([]);
  const [reviewCounts, setReviewCounts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('전체');
  let displayProducts = productList;

  useEffect(() => {
    const getProductList = async () => {
      try {
        const productListData = await pb.collection('product').getFullList();
        setProductList(productListData);
        const reviewsData = await pb.collection('reviews').getFullList();
        let counts = {};
        for (let product of productListData) {
          counts[product.id] = reviewsData.filter(review => review.product_title === product.title).length;
        }       
        setReviewCounts(counts);
      } catch (error) {
        throw new Error('Error fetching product list');
      }
    };
    getProductList();
  }, []);
  

  if (selectedCategory === '무료배송') {
    displayProducts = productList.filter(product => product.delivery_free);
  } else if (selectedCategory === '신상품') {
    displayProducts = productList.slice().sort((a, b) => b.product_date.localeCompare(a.product_date)).slice(0,7);
  } else if (selectedCategory === '베스트') {
    displayProducts = productList.slice().sort((a, b) => b.total_sale - a.total_sale).slice(0, 10);
  } else {
    displayProducts = productList;
  }

  return (
    <div className="bg-pet-bg max-w-4xl my-0 mx-auto">
      <ProductListNav onCategorySelect={setSelectedCategory}/>
      <ol className="px-2 bg-pet-bg flex flex-wrap max-w-4xl mx-auto justify-start mt-5 gap-2">
        {displayProducts.map(product => (
           <ProductItem product={product} key={product.id} reviewCount={reviewCounts[product.id]} />
           ))}
      </ol>
    </div>
   )
}

export default ProductList
