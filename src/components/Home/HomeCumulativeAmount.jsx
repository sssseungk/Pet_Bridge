import sample from '/assets/imgs/Home_dog.png';
function HomeCumulativeAmount() {
  return (
    <section className="bg-primary relative py-7 px-5">
      <h2 className="font-bold">여러분들의 후원으로 이만큼이나 모였어요.</h2>
      <span className="text-sm font-semibold">누적후원금액</span>
      <p className="text-2xl font-black">
        <span>0</span>원
      </p>
      <div
        className="bg-white w-full h-5 rounded-t-full absolute bottom-0 left-0"
        style={{ boxShadow: '0px -12px 12px rgba(0, 0, 0, 0.08)' }}
      >
        <img
          src={sample}
          alt=""
          className="absolute bottom-2 right-[calc(10%-0.4rem)] "
        />
      </div>
    </section>
  );
}

export default HomeCumulativeAmount;
