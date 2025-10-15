import useStoreStep from '@/store/store.step.ts';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PageMainStep5() {
  const { setStep } = useStoreStep();
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStep(0);
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [setStep]);

  return (
    <>
      <div className={'mq-[margin-top|-200px]'}>
        <div>
          <motion.h1
            initial={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={
              'text-black text-center whitespace-nowrap mq-[margin-top|56px]'
            }
          >
            당신의 호흡이
            <br />
            빛의 리듬이 되었습니다.
            <br />
            사진을 남겨보세요.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={
              'text-black text-center whitespace-nowrap mq-[margin-top|24px]'
            }
          >
            Your breath has become a rhythm of light.
            <br />
            Capture the moment.
          </motion.p>
        </div>
      </div>
    </>
  );
}
