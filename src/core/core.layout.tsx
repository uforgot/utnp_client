import * as React from 'react';
import CoreBackground from '@/core/core.background.tsx';
import CoreFrame from '@/core/core.frame.tsx';
import storeStep from '@/store/store.step.ts';

export default function CoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { step } = storeStep();

  return (
    <main className={'absolute left-0 top-0 w-full h-full overflow-hidden'}>
      <CoreBackground />
      <div
        className={'absolute left-1/2 top-1/2 aspect-square z-end'}
        style={{
          width: window.innerWidth > window.innerHeight ? '100%' : 'unset',
          height: window.innerWidth > window.innerHeight ? 'unset' : '100%',
          opacity: step < 4 ? 0 : 1,
          transition: 'opacity 1s ease-in, transform 1s 0.1s ease-in',
          transform:
            step < 4
              ? 'translate(-50%, -50%) scale(0.5)'
              : 'translate(-50%, -50%) scale(1.0)',
        }}
      >
        <img
          src={'/background-end.webp'}
          alt={'background'}
          className={'w-full h-full'}
        />
      </div>
      <div className={'relative z-content w-full h-full'}>
        <div className={'absolute left-1/2 top-1/2 -translate-1/2'}>
          {children}
        </div>
      </div>
      <CoreFrame />
    </main>
  );
}
