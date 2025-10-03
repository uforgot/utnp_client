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
    </main>
  );
}
