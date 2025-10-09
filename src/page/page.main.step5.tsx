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
        <motion.div
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h1
            className={
              'text-black text-center whitespace-nowrap mq-[margin-top|56px]'
            }
          >
            당신의 호흡이
            <br />
            빛의 리듬이 되었습니다.
            <br />
            사진을 남겨보세요.
          </h1>
          <p
            className={
              'text-black text-center whitespace-nowrap mq-[margin-top|24px]'
            }
          >
            Your breath is now a rhythm of light.
            <br />
            Capture the moment.
          </p>
        </motion.div>
      </div>
    </>
  );
}
