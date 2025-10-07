import * as React from 'react';
import CoreBackground from '@/core/core.background.tsx';
import CoreFrame from '@/core/core.frame.tsx';

export default function CoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={'absolute left-0 top-0 w-full h-full'}>
      <CoreBackground />
      <div className={'relative z-content'}>{children}</div>
      <CoreFrame />
    </main>
  );
}
