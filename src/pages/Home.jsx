import HomeContact from '@/components/Home/HomeContact';
import HomeCumulativeAmount from '@/components/Home/HomeCumulativeAmount';
import HomePlace from '@/components/Home/HomePlace';
import HomeShop from '@/components/Home/HomeShop';

function Home() {
  return (
    <div className="max-w-screen-pet-l mx-auto ">
      <HomeCumulativeAmount />
      <HomeShop />
      <HomeContact />
      <HomePlace />
    </div>
  );
}

export default Home;
