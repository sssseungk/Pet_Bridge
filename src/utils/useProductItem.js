import useFetchData from './useFetchData';

const getEndpoint = (productId) =>
  `https://petbridge.pockethost.io/api/collections/product/records/${productId}`;


function useProductItem(productId) {
  const responseData = useFetchData(getEndpoint(productId));
  return responseData;
}

export default useProductItem; 