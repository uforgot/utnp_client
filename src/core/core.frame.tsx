import * as React from 'react';

export default function CoreFrame() {
  return (
    <div
      className={
        'absolute left-0 top-0 w-full h-full z-frame pointer-events-none'
      }
    >
      <div className={'absolute left-1/2 mq-[bottom|150px] mq-[width|214px]'}>
        <img
          src={'/logo-kolon.svg'}
          alt={'logo-kolon'}
          className={'-translate-x-1/2'}
        />
      </div>
    </div>
  );
}
