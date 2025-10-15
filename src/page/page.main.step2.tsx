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

  const [count, setCount] = useState('');
  const { setStep } = useStoreStep();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCount((prev) => {
        if (prev === '0') {
          return prev;
        }
        if (prev === '') {
          return '3';
        }
        return `${parseInt(prev) - 1}`;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (parseInt(count) === 0) {
      setStep(2);
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
          <motion.div
            initial={{ opacity: 0, y: '20px' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            이제 곧 시작됩니다.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: '20px' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            편하게 숨쉴 준비를 하세요.
          </motion.div>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: '20px' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={
            'text-lime text-center whitespace-nowrap mq-[margin-top|24px]'
          }
        >
          Starting soon. Relax and get ready to breathe.
        </motion.p>
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
          {parseInt(count) < 1 ? '1' : count}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
