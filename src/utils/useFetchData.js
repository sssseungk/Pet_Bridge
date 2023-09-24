import { useEffect, useState } from 'react';

function useFetchData(endpoint) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);

    async function fetchProducts() {
      try {
        const response = await fetch(endpoint, {
          signal: controller.signal,
        });
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        if (!(error instanceof DOMException)) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, [endpoint]);

  return { data, isLoading, error };
}

export default useFetchData;