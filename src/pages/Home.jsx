import HomeContact from '@/components/Home/HomeContact';
import HomeCumulativeAmount from '@/components/Home/HomeCumulativeAmount';
import HomeListCompo from '@/components/Home/HomeListCompo';
import HomeBenner from '@/components/Home/HomeBenner';

function Home() {
  // const place="내용"
  return (
    <div className="max-w-screen-pet-l mx-auto ">
      <HomeCumulativeAmount />
      <HomeBenner />
      <HomeContact title={'도움이 필요한 유기동물이 있나요?'} />
      <HomeListCompo title={'봉사활동 여기는 어떠세요?'} />
    </div>
  );
}

export default Home;
