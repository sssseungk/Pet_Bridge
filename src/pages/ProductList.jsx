import ProductItem from "@/components/ProductList/ProductItem"
import ProductListNav from './../components/ProductList/ProductListNav';
import {pb} from '@/api/pocketbase';
import { useEffect } from "react";
import { useState } from "react";


function ProductList() {
  const [productList, setProductList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('베스트');
  let displayProducts = productList;

  useEffect(() => {
    const getProductList = async () => {
      try {
        const productListData = await pb.collection('product').getFullList();
        setProductList(productListData);
      } catch (error) {
        throw new Error('Error fetching product list');
      }
    };
    getProductList();
  }, );
  

  if (selectedCategory === '무료배송') {
    displayProducts = productList.filter(product => product.delivery_free);
  } else if (selectedCategory === '신상품') {
    displayProducts = productList.slice().sort((a, b) => b.product_date.localeCompare(a.product_date)).slice(0,10);
  } else if (selectedCategory === '베스트') {
    displayProducts = productList.slice().sort((a, b) => b.total_sale - a.total_sale);
  } else{
    displayProducts = productList;
  }

  return (
    <div className="bg-pet-bg">
      <ProductListNav onCategorySelect={setSelectedCategory}/>
      <ol className="bg-pet-bg flex flex-wrap max-w-4xl mx-auto justify-start mt-5 gap-2">
        {displayProducts.map(product => (
            <ProductItem product={product} key={product.id}/>
         ))}
      </ol>
    </div>
   )
}

export default ProductList
