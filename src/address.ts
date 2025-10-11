import io, { Socket } from 'socket.io-client';
import * as Ably from 'ably';
import type InteractiveStage from '@/interactive/interactive.stage.ts';
import type { DefaultEventsMap } from '@socket.io/component-emitter';

class Address {
  private static instance: Address;
  public interactiveStage: InteractiveStage | undefined;
  // private webSocket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
  private data: string | undefined;

  private constructor() {}

  // private setSocket() {
  //   this.webSocket = io('http://192.168.68.65:8087', {
  //     transports: ['websocket', 'polling'],
  //   });
  //
  //   this.webSocket.on('connect', this.onConnect.bind(this));
  // }
  //
  // onConnect() {
  //   console.log('connect');
  //   if (!this.webSocket) return;
  //
  //   this.webSocket.emit('s', this.data);
  // }

  public static getInstance(): Address {
    if (!Address.instance) {
      Address.instance = new Address();
    }
    return Address.instance;
  }

  public setSave() {
    this.data = this.interactiveStage?.setSave();
    this.interactiveStage?.destroy();
  }

  public setSend() {
    const ably = new Ably.Realtime(
      'LWMPBA.iyAokg:uUWmR8k2r-li4oPBlT-rz83ju_qSEMMLkd1w2Jxqmig'
    );
    ably.connection.once('connected', async () => {
      console.log('Connected to Ably!');
      const channel = ably.channels.get('utnp');
      await channel.publish('send', this.data);
      ably.connection.close();
    });
  }

  public setInteractiveStage(interactiveStage: InteractiveStage) {
    this.interactiveStage = interactiveStage;
  }
}

export default Address;
