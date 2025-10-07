import { useEffect } from 'react';
import useStoreStep from '@/store/store.step.ts';

export default function PageMainStep2() {
  const { setStep } = useStoreStep();
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStep(2);
    }, 2000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [setStep]);

  return (
    <>
      <div className={'mq-[margin-top|-424px]'}>
        <h1
          className={
            'text-lime text-center whitespace-nowrap mq-[margin-top|56px]'
          }
        >
          곧 카운트가 시작됩니다.
          <br />
          5초간 자연스럽게 숨을 내쉬세요.
        </h1>
        <p
          className={
            'text-lime text-center whitespace-nowrap mq-[margin-top|24px]'
          }
        >
          The countdown will begin. Exhale naturally for 5 seconds.
        </p>
      </div>
      <div
        className={
          'absolute left-1/2 mq-[margin-top|250px] mq-[width|307px] -translate-1/2'
        }
      >
        <img src={'/breath.svg'} alt={'breah'} />
      </div>
    </>
  );
}
