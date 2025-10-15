import { motion } from 'framer-motion';
import useStoreStep from '@/store/store.step.ts';

export default function PageMainStep1() {
  const { setStep } = useStoreStep();
  return (
    <div className={'mq-[margin-top|-140px]'}>
      <motion.div
        className={'mq-[width|812px]'}
        initial={{ opacity: 0, y: '0', scale: 1.2 }}
        animate={{ opacity: 1, y: 0, scale: 1.0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        <img src={'title.svg'} />
      </motion.div>
      <h2
        className={
          'text-lime text-center whitespace-nowrap mq-[margin-top|56px]'
        }
      >
        <motion.div
          initial={{ opacity: 0, y: '20px' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          당신의 호흡이 빛의 리듬으로 시각화됩니다.
        </motion.div>
        {/*<br />*/}
        <motion.div
          initial={{ opacity: 0, y: '10px' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          숨을 들이쉬고, 시작해볼까요?
        </motion.div>
      </h2>
      <motion.p
        initial={{ opacity: 0, y: '20px' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className={
          'text-lime text-center whitespace-nowrap mq-[margin-top|20px]'
        }
      >
        Your breath becomes a rhythm of light.
        <br />
        Take a deep breath and let's begin.
      </motion.p>
      <div className={'mq-[margin-top|100px] flex justify-center'}>
        <motion.button
          className={
            'mq-[width|368px] mq-[height|130px] bg-lime rounded-full flex justify-center items-center text-black cursor-pointer'
          }
          initial={{ opacity: 0, y: '20px' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setStep(1)}
        >
          START
        </motion.button>
      </div>
    </div>
  );
}
