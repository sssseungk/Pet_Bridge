import useFetchData from './useFetchData';

const endpoint = `https://petbridge.pockethost.io/api/collections/product/records`;

function useProductList() {
  const responseData = useFetchData(endpoint);
  return responseData;
}

export default useProductList;