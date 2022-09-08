import { Handler } from './Handler';

export type EventType =
  | 'add'
  | 'remove'
  | 'changed'
  | 'paste'
  | 'redo'
  | 'undo'
  | 'selected';

export class EventManagerHandler {
  handler: Handler;
  subscribes: Map<any, any>;

  constructor(handler: Handler) {
    this.handler = handler;
    this.initialize();
  }

  public initialize = () => {
    this.subscribes = new Map();
  };

  on(name: EventType, func: ({ ...arg }) => void) {
    if (!this.subscribes.has(name)) this.subscribes.set(name, []);
    this.subscribes.get(name).push(func);
    return () => this.unsubscribeOf(name, func);
  }

  onMulti(names: EventType[], func: ({ ...arg }) => void) {
    names.forEach((value) => {
      this.on(value, func);
    });
  }

  emit(name: EventType, arg: any) {
    const refunds: any[] = [];
    if (this.subscribes.has(name))
      this.subscribes.get(name).forEach((func: ({ ...arg }) => void) => {
        if (func) refunds.push(func(arg));
      });
    return refunds;
  }

  unsubscribeOf(name: EventType, func: ({ ...arg }) => void) {
    if (!this.subscribes.has(name)) {
      return;
    }

    if (func)
      this.subscribes.set(
        name,
        this.subscribes
          .get(name)
          .filter((f: ({ ...arg }) => void) => f !== func)
      );
    else this.subscribes.delete(name);
  }

  unsubscribeOfMulti(names: EventType[], func: ({ ...arg }) => void) {
    names.forEach((value) => {
      this.unsubscribeOf(value, func);
    });
  }
}
