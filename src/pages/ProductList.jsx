import ProductItem from "@/components/ProductList/ProductItem"
import ProductListNav from './../components/ProductList/ProductListNav';
import {pb} from '@/api/pocketbase';
import { useEffect } from "react";

const renderProductList = await pb.collection('product').getFullList();

function ProductList() {

  useEffect(() => {
    try{
      renderProductList;
      // console.log(renderProductList);
    } catch(error){
      throw new Error('error');
    }
  }, []);
  
  return (
    <div className="bg-pet-bg">
      <ProductListNav/>
      <ol className="bg-pet-bg flex flex-wrap max-w-4xl mx-auto justify-center mt-5 gap-2">
        {renderProductList?.map(product => {
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