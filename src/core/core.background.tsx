import * as React from 'react';
import InteractiveStage from '@/interactive/interactive.stage.ts';

interface IProps {}
export default class CoreBackground extends React.Component<IProps> {
  private refStageEl = React.createRef<HTMLDivElement>();
  private stage: InteractiveStage | undefined;

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    const stageEl = this.refStageEl.current;
    if (stageEl && this.stage === undefined) {
      this.stage = new InteractiveStage(stageEl);
    }
  }

  componentWillUnmount() {
    this.stage?.destroy();
    this.stage = undefined;
  }

  render() {
    return (
      <div className={'absolute left-0 top-0 w-full h-full z-background'}>
        <div className={'absolute left-0 top-0 w-full h-full'}>
          <img
            src={'/bg.jpg'}
            alt={'background'}
            className={'w-full h-full object-cover'}
          />
        </div>
        <div
          style={{
            filter: 'blur(10px) brightness(0.9) contrast(1.3)',
          }}
          className={'absolute w-full h-full top-0 left-0'}
          ref={this.refStageEl}
        />
      </div>
    );
  }
}
