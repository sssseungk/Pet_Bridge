import HomeContact from '@/components/Home/HomeContact';
import HomeCumulativeAmount from '@/components/Home/HomeCumulativeAmount';
import HomeListCompo from '@/components/Home/HomeListCompo';
import HomeBenner from '@/components/Home/HomeBenner';

function Home() {
  // const place="내용"
  return (
    <div className="mx-auto max-w-screen-pet-l ">
      <HomeCumulativeAmount Amount={2132154} Amount={5643845} />
      <HomeBenner title={'유기동물에게 희망을 전달하세요!'} />
      <HomeContact title={'도움이 필요한 유기동물이 있나요?'} />
      <HomeListCompo title={'봉사활동 여기는 어떠세요?'} />
    </div>
  );
}

export default Home;
