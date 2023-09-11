import { useEffect, useState } from 'react';
import ProductItem from '@/components/ProductList/ProductItem';
import { pb } from '@/api/pocketbase';
import { PropTypes } from 'prop-types';

function SearchProductList({ selectedCategory }) {
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

  const filteredProducts = productList.filter(product => product.category === selectedCategory);

  return (
    <div className="bg-pet-bg pb-16">
      <ol className="bg-pet-bg flex flex-wrap max-w-4xl mx-auto justify-start mt-5 gap-2">
        {filteredProducts.map(product => (
          <ProductItem product={product} key={product.id} />
        ))}
      </ol>
    </div>
  );
}

export default SearchProductList;

SearchProductList.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};