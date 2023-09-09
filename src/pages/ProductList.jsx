import ProductItem from "@/components/ProductList/ProductItem"
import ProductListNav from './../components/ProductList/ProductListNav';

function ProductList() {
  
  return (
    <div>
      <ProductListNav/>
      <ol className="flex flex-wrap max-w-4xl mx-auto justify-center mt-5 gap-2">
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
      </ol>
    </div>
  )
}

export default ProductList