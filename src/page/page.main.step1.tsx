import { motion } from 'framer-motion';
import useStoreStep from '@/store/store.step.ts';

export default function PageMainStep1() {
  const { setStep } = useStoreStep();
  return (
    <div className={'mq-[margin-top|-140px]'}>
      <div className={'mq-[width|812px]'}>
        <img src={'title.svg'} />
      </div>
      <h2
        className={
          'text-lime text-center whitespace-nowrap mq-[margin-top|56px]'
        }
      >
        당신의 호흡이 빛의 리듬으로 시각화됩니다.
        <br />
        숨을 들이쉬고, 시작해볼까요?
      </h2>
      <p
        className={
          'text-lime text-center whitespace-nowrap mq-[margin-top|20px]'
        }
      >
        Your breath becomes a rhythm of light.
        <br />
        Take a deep breath and let's begin.
      </p>
      <div className={'mq-[margin-top|100px] flex justify-center'}>
        <motion.button
          className={
            'mq-[width|368px] mq-[height|130px] bg-lime rounded-full flex justify-center items-center text-black cursor-pointer'
          }
          whileTap={{ scale: 0.95 }}
          onClick={() => setStep(1)}
        >
          START
        </motion.button>
      </div>
    </div>
  );
}
