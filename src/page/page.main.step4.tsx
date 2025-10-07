export default function PageMainStep4() {
  return (
    <>
      <div className={'-translate-y-1/2'}>
        <h1
          className={
            'text-lime text-center whitespace-nowrap mq-[margin-top|56px]'
          }
        >
          당신의 호흡을
          <br />
          인식하고 있습니다.
        </h1>
        <p
          className={
            'text-lime text-center whitespace-nowrap mq-[margin-top|24px]'
          }
        >
          Reading your breath.
        </p>
      </div>
      <div
        className={
          'absolute left-1/2 top-0 -translate-1/2 mq-[width|850px] mq-[margin-top|50px]'
        }
      >
        <img src={'/loading.svg'} alt={'loading'} />
      </div>
    </>
  );
}
