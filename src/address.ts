import type InteractiveStage from '@/interactive/interactive.stage.ts';

class Address {
  private static instance: Address;
  public interactiveStage: InteractiveStage | undefined;

  private constructor() {
    // 초기화 코드 작성
  }

  public static getInstance(): Address {
    if (!Address.instance) {
      Address.instance = new Address();
    }
    return Address.instance;
  }

  public setInteractiveStage(interactiveStage: InteractiveStage) {
    this.interactiveStage = interactiveStage;
  }
}

export default Address;
