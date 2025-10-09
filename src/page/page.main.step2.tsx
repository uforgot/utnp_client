import { useEffect, useState } from 'react';
import useStoreStep from '@/store/store.step.ts';
import { AnimatePresence, motion } from 'framer-motion';

export default function PageMainStep2() {
  // const { setStep } = useStoreStep();
  // useEffect(() => {
  //   const timer = window.setTimeout(() => {
  //     setStep(2);
  //   }, 3000);
  //
  //   return () => {
  //     window.clearTimeout(timer);
  //   };
  // }, [setStep]);

  const [count, setCount] = useState(3);
  const { setStep } = useStoreStep();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCount((prev) => {
        if (prev === 0) {
          return prev;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (count === 0) {
      window.setTimeout(() => {
        setStep(2);
      }, 500);
    }
  }, [count, setStep]);

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
          10초간 자연스럽게 숨을 내쉬세요.
        </h1>
        <p
          className={
            'text-lime text-center whitespace-nowrap mq-[margin-top|24px]'
          }
        >
          The countdown will begin. Exhale naturally for 5 seconds.
        </p>
      </div>
      {/*<div*/}
      {/*  className={*/}
      {/*    'absolute left-1/2 mq-[margin-top|250px] mq-[width|307px] -translate-1/2'*/}
      {/*  }*/}
      {/*>*/}
      {/*  <img src={'/breath.svg'} alt={'breah'} />*/}
      {/*</div>*/}
      <AnimatePresence mode={'wait'}>
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          key={count}
          className={
            'absolute left-1/2 mq-[margin-top|250px] mq-[width|307px] -translate-1/2 count'
          }
        >
          {count}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
