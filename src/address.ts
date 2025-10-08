import io, { Socket } from 'socket.io-client';
import type InteractiveStage from '@/interactive/interactive.stage.ts';
import type { DefaultEventsMap } from '@socket.io/component-emitter';

class Address {
  private static instance: Address;
  public interactiveStage: InteractiveStage | undefined;
  private webSocket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
  private data: string | undefined;

  private constructor() {}

  private setSocket() {
    this.webSocket = io('http://192.168.68.65:8087', {
      transports: ['websocket', 'polling'],
    });

    this.webSocket.on('connect', this.onConnect.bind(this));
  }

  onConnect() {
    console.log('connect');
    if (!this.webSocket) return;

    this.webSocket.emit('s', this.data);
  }

  public static getInstance(): Address {
    if (!Address.instance) {
      Address.instance = new Address();
    }
    return Address.instance;
  }

  public setSave() {
    this.data = this.interactiveStage?.setSave();
    this.setSocket();

    this.interactiveStage?.destroy();
  }

  public setInteractiveStage(interactiveStage: InteractiveStage) {
    this.interactiveStage = interactiveStage;
  }
}

export default Address;
