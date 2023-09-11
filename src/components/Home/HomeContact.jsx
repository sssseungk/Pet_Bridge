import EmailLink from './EmailLink';

function HomeContact() {
  return (
    <section className="px-5 py-3 flex gap-3 flex-col">
      <div className="flex justify-between items-center">
        <h2 className="font-bold inline">도움이 필요한 유기동물이 있나요?</h2>
        <span className="text-xs">더보기 &gt;</span>
      </div>
      <div className="bg-[#67B5D7] rounded-lg px-4 py-3 flex flex-col items-end gap-3 relative">
        <p className="text-right text-xl font-semibold">
          주변의 유기동물의 사연을
          <br />
          펫:브릿지에게 보내주세요
        </p>
        <EmailLink text={`후원신청하기 >`} />
        <img
          alt="우체통"
          src="/public/assets/imgs/post_box.png"
          className="absolute bottom-0 left-2"
        ></img>
      </div>
    </section>
  );
}

export default HomeContact;
