import * as React from 'react';
import CoreBackground from '@/core/core.background.tsx';

export default function CoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <CoreBackground />
      <div className={'relative z-20'}>{children}</div>
      <div
        style={{ mixBlendMode: 'difference' }}
        className={
          'absolute left-0 top-0 w-full h-full z-200 pointer-events-none'
        }
      >
        <div className={'absolute left-1/2 top-[3%] w-[7%] -translate-x-1/2'}>
          <img src={'/logo-kolon.svg'} alt={'logo-kolon'} />
        </div>
        <div
          className={'absolute left-1/2 bottom-[3%] w-[20%] -translate-x-1/2'}
        >
          <img src={'/logo-utnp.svg'} alt={'logo-utnp'} />
        </div>
        <div
          className={
            'absolute left-1/2 top-1/2 w-[70%] -translate-x-1/2 -translate-y-1/2'
          }
        >
          <img src={'/slogan.svg'} alt={'logo-utnp'} width={'100%'} />
        </div>
      </div>
    </main>
  );
}
