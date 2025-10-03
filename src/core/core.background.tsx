import * as React from 'react';
import InteractiveStage from '@/interactive/interactive.stage.ts';
import InteractiveEqualizer from '@/interactive/interactive.equalizer.ts';

interface IProps {}
export default class CoreBackground extends React.Component<IProps> {
  private refStageEl = React.createRef<HTMLDivElement>();
  private refEqualizerEl = React.createRef<HTMLDivElement>();
  private stage: InteractiveStage | undefined;
  private equalizer: InteractiveEqualizer | undefined;

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    const equalizerEl = this.refEqualizerEl.current;
    if (equalizerEl && this.equalizer === undefined) {
      this.equalizer = new InteractiveEqualizer(equalizerEl);
      console.log('Equalizer initialized');
    }

    const stageEl = this.refStageEl.current;
    if (stageEl && this.stage === undefined) {
      this.stage = new InteractiveStage(stageEl);
    }
  }

  componentWillUnmount() {
    this.stage?.destroy();
    this.stage = undefined;

    this.equalizer?.destroy();
    this.equalizer = undefined;
  }

  render() {
    return (
      <div>
        <div
          style={{ background: 'rgb(48,11,11)' }}
          className={'absolute top-0 left-0 w-full h-full hue-rotate-animation'}
        />
        <div
          className={'absolute left-0 right-0 w-full h-full'}
          style={{
            filter: 'blur(50px)',
          }}
        >
          <div
            style={{ background: 'rgb(97,56,56)' }}
            className={
              'absolute left-1/2 top-1/2 w-[80%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full hue-rotate-animation'
            }
          />
        </div>
        <div
          className={'absolute left-0 right-0 w-full h-full h-full'}
          style={{
            filter: 'blur(80px)',
          }}
        >
          <div
            style={{ background: 'rgb(159,109,109)' }}
            className={
              'absolute left-1/2 top-1/2 w-[40%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full hue-rotate-animation'
            }
          />
        </div>
        <div
          style={{
            filter: 'blur(10px) brightness(0.9) contrast(1.3)',
          }}
          className={'absolute w-full h-full top-0 left-0 z-10'}
          ref={this.refStageEl}
        />
        {/*<div*/}
        {/*  className={'absolute w-[200px] h-[150px] top-0 left-0 z-10'}*/}
        {/*  ref={this.refEqualizerEl}*/}
        {/*/>*/}
        <button
          className={
            'absolute right-0 bottom-0 bg-[red] cursor-pointer z-100 p-3'
          }
          onClick={() => {
            this.stage?.init();
          }}
        >
          play
        </button>
      </div>
    );
  }
}
