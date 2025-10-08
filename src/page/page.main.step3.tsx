import { useEffect, useRef, useState } from 'react';
import useStoreStep from '@/store/store.step.ts';
import Constant from '@/constant/constant.ts';
import Address from '@/address.ts';

export default function PageMainStep3() {
  const [timeLeft, setTimeLeft] = useState('');
  const { setStep } = useStoreStep();
  const refIsStart = useRef(false);

  useEffect(() => {
    if (refIsStart.current) return;
    refIsStart.current = true;

    let timerId = 0;
    function formatTime(ms: number) {
      const second = Math.floor((ms / 1000) % 60);
      const millisecond = Math.floor((ms % 1000) / 10);
      return `${second.toString().padStart(2, '0')}:${millisecond.toString().padStart(2, '0')}`;
    }

    function intervalTimer(endTime: Date, timeout: number) {
      timerId = window.setInterval(() => {
        const now = Date.now();
        const end = endTime.getTime();
        let timeLeft = end - now;

        if (timeLeft <= 0) {
          timeLeft = 0;
          window.clearInterval(timerId);
          Address.getInstance().interactiveStage?.setSave();
          setStep(3);
        }
        setTimeLeft(formatTime(timeLeft));
      }, timeout);
    }

    Address.getInstance().interactiveStage?.setStart();

    intervalTimer(new Date(Date.now() + 3000), 1000 / Constant.FPS);
  }, [setStep, setTimeLeft]);

  return (
    <>
      <div className={'mq-[margin-top|-424px]'}>
        <h1
          className={
            'text-lime text-center whitespace-nowrap mq-[margin-top|56px]'
          }
        >
          마이크 앞에 서서
          <br />
          자연스럽게 숨을 내쉬어주세요.
        </h1>
        <p
          className={
            'text-lime text-center whitespace-nowrap mq-[margin-top|24px]'
          }
        >
          Stand in front of the mic and breathe out naturally.
        </p>
      </div>

      <div
        className={
          'absolute left-0 mq-[margin-top|250px] -translate-y-1/2 w-full timer text-center'
        }
      >
        {timeLeft}
      </div>
    </>
  );
}
