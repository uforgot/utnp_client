import PageMainStep1 from '@/page/page.main.step1.tsx';
import { useMemo } from 'react';
import PageMainStep2 from '@/page/page.main.step2.tsx';
import PageMainStep3 from '@/page/page.main.step3.tsx';
import PageMainStep4 from '@/page/page.main.step4.tsx';
import PageMainStep5 from '@/page/page.main.step5.tsx';
import useStoreStep from '@/store/store.step.ts';
import { AnimatePresence, motion } from 'framer-motion';

export default function PageMain() {
  const { step } = useStoreStep();

  const scene = useMemo(() => {
    switch (step) {
      case 0:
        return <PageMainStep1 />;
      case 1:
        return <PageMainStep2 />;
      case 2:
        return <PageMainStep3 />;
      case 3:
        return <PageMainStep4 />;
      case 4:
        return <PageMainStep5 />;
      default:
        return <PageMainStep1 />;
    }
  }, [step]);

  return (
    <>
      <AnimatePresence mode={'wait'}>
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          key={step}
        >
          {scene}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
