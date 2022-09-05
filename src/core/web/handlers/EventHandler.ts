import { Handler } from './Handler';

export type EventType =
  | 'add'
  | 'remove'
  | 'changed'
  | 'paste'
  | 'redo'
  | 'undo';

class EventHandler {
  handler: Handler;
  subscribes: Map<any, any>;

  constructor(handler: Handler) {
    this.handler = handler;
    this.initialize();
  }

  public initialize = () => {
    this.subscribes = new Map();
  };

  on(name: EventType, func: Function) {
    if (!this.subscribes.has(name)) this.subscribes.set(name, []);
    this.subscribes.get(name).push(func);
    return () => this.unsubscribeOf(name, func);
  }

  onMulti(names: EventType[], func: Function) {
    names.forEach((value) => {
      this.on(value, func);
    });
  }

  once(name: EventType, func: Function) {
    const unsubscribe = this.on(name, function () {
      func.apply(undefined, arguments);
      unsubscribe();
    });
    return unsubscribe;
  }

  emit(name: EventType, arg: any) {
    const refunds: any[] = [];
    if (this.subscribes.has(name))
      this.subscribes.get(name).forEach((func: Function) => {
        if (func) refunds.push(func(arg));
      });
    return refunds;
  }

  unsubscribeOf(name: EventType, func: Function) {
    if (!this.subscribes.has(name)) {
      return;
    }

    if (func)
      this.subscribes.set(
        name,
        this.subscribes.get(name).filter((f: Function) => f !== func)
      );
    else this.subscribes.delete(name);
  }

  unsubscribeOfMulti(names: EventType[], func: Function) {
    names.forEach((value) => {
      this.unsubscribeOf(value, func);
    });
  }
}

export default EventHandler;
