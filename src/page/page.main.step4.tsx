import useStoreStep from '@/store/store.step.ts';
import { useEffect } from 'react';

export default function PageMainStep4() {
  const { setStep } = useStoreStep();
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStep(4);
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [setStep]);

  return (
    <>
      <div className={'-translate-y-1/2'}>
        <h1 className={'text-lime text-center whitespace-nowrap'}>
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
        <div
          className={
            'absolute left-1/2 top-1/2 -translate-1/2 mq-[width|850px] rotate-animation aspect-square'
          }
        >
          <img src={'/loading.svg'} alt={'loading'} />
        </div>
      </div>
    </>
  );
}
