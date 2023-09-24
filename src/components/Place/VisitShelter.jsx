import { useQuery } from '@tanstack/react-query';
import Spinner from '../Common/Spinner';
import PlaceList from './PlaceList';

function VisitShelter() {
  async function fetchPlaceList() {
    const response = await fetch(
      `${import.meta.env.VITE_PB_API}/collections/place/records`
    );
    return await response.json();
  }

  const { isLoading, data, isError, error } = useQuery(
    ['places'],
    fetchPlaceList,
    {
      retry: 2,
      staleTime: 1 * 60 * 1000,
      refetchOnWindowFocus: true,
    }
  );
  console.log(data);
  if (isLoading) {
    return (
      <div className="grid place-content-center h-full">
        <Spinner size={160} />
      </div>
    );
  }

  if (isError) {
    return <div role="alert">{error.toString()}</div>;
  }

  return (
    <>
      <section className="my-0 mx-[20px]">
        <h2 className="font-bold mt-[14%] mb-[3%] mx-0 text-sm pet-m:text-lg pet-l:text-xl transition-[0.3s]">
          보호소 사이트 방문하기
        </h2>
        <ul>
          {data &&
            data?.items?.map((place, i) => (
              <PlaceList place={place} key={`${place}_${i}`} />
            ))}
        </ul>
      </section>
    </>
  );
}
export default VisitShelter;
