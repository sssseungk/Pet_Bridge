import ProductItem from "@/components/ProductItem"

function ProductList() {
  return (
    <div>
      <ol className="flex flex-wrap w-full justify-center gap-6 mt-5">
        <li className="w-2/5 shadow-lg">
          <ProductItem/>
        </li>
        <li className="w-2/5 shadow-lg">
          <ProductItem/>
        </li>
        <li className="w-2/5 shadow-lg">
          <ProductItem/>
        </li>
        <li className="w-2/5 shadow-lg">
          <ProductItem/>
        </li>
        <li className="w-2/5 shadow-lg">
          <ProductItem/>
        </li>
        <li className="w-2/5 shadow-lg">
          <ProductItem/>
        </li>
      </ol>
    </div>
  )
}

export default ProductList