import ProductItem from "@/components/ProductList/ProductItem"
import ProductListNav from './../components/ProductList/ProductListNav';
import {pb} from '@/api/pocketbase';
import { useEffect } from "react";
import { useState } from "react";


function ProductList() {
  const [productList, setProductList] = useState([]);

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
  }, []);
  
  return (
    <div className="bg-pet-bg">
      <ProductListNav/>
      <ol className="bg-pet-bg flex flex-wrap max-w-4xl mx-auto justify-start mt-5 gap-2">
        {productList?.map(product => {
          return (
          <>   
            <ProductItem product={product} key={product.id}/>
          </>
          )
        })}
      </ol>
    </div>
  )
}

export default ProductList