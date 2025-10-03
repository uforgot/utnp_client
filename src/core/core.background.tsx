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
      <>
        <div
          className={'absolute w-full h-full top-0 left-0 z-10'}
          ref={this.refStageEl}
        />
        <div
          className={'absolute w-[400px] h-[300px] top-0 left-0 z-10'}
          ref={this.refEqualizerEl}
        />
        <button
          className={'absolute left-1/2 bg-[red] cursor-pointer z-100 p-10'}
          onClick={() => {
            console.log('--> play');
            console.log(this.equalizer);
            this.equalizer?.init();
          }}
        >
          play
        </button>
      </>
    );
  }
}
