import * as React from 'react';
import CoreBackground from '@/core/core.background.tsx';
import CoreFrame from '@/core/core.frame.tsx';

export default function CoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={'absolute left-0 top-0 w-full h-full overflow-hidden'}>
      <CoreBackground />
      <div className={'relative z-content w-full h-full'}>
        <div className={'absolute left-1/2 top-1/2 -translate-1/2'}>
          {children}
        </div>
      </div>
      <CoreFrame />
    </main>
  );
}
