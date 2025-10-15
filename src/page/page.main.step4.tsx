import useStoreStep from '@/store/store.step.ts';
import { useEffect } from 'react';
import Address from '@/address.ts';
import { motion } from 'framer-motion';

export default function PageMainStep4() {
  const { setStep } = useStoreStep();
  useEffect(() => {
    const timer = window.setTimeout(() => {
      Address.getInstance().setSend();
      setStep(4);
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [setStep]);

  return (
    <>
      <div className={'-translate-y-1/2'}>
        <motion.h1
          className={'text-lime text-center whitespace-nowrap'}
          initial={{ opacity: 0, y: '0', scale: 1.1, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, scale: 1.0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          당신의 호흡을
          <br />
          인식하고 있습니다.
        </motion.h1>
        <motion.p
          className={
            'text-lime text-center whitespace-nowrap mq-[margin-top|24px]'
          }
          initial={{ opacity: 0, y: '0', scale: 1.1, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, scale: 1.0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Reading your breath.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: '0', filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0 }}
          className={
            'absolute left-1/2 top-1/2 -translate-1/2 mq-[width|850px] rotate-animation aspect-square'
          }
        >
          <img src={'/loading.svg'} alt={'loading'} />
        </motion.div>
      </div>
    </>
  );
}
