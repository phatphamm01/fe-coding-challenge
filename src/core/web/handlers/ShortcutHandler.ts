import { code } from '../constants';
import { KeyEvent } from '../types';
import { Handler } from './Handler';

class ShortcutHandler {
  handler: Handler;
  keyEvent: KeyEvent;

  constructor(handler: Handler) {
    this.handler = handler;
    this.keyEvent = handler.keyEvent;
  }

  public isDelete = (e: KeyboardEvent) => {
    return (
      (e.code === code.BACKSPACE || e.code === code.DELETE) && this.keyEvent.del
    );
  };

  public isCtrlC = (e: KeyboardEvent) => {
    return (
      (e.ctrlKey || e.metaKey) && e.code === code.KEY_C && this?.keyEvent.copy
    );
  };

  public isCtrlV = (e: KeyboardEvent) => {
    return (
      (e.ctrlKey || e.metaKey) && e.code === code.KEY_V && this?.keyEvent.paste
    );
  };

  public isCtrlZ = (e: KeyboardEvent) => {
    return (
      (e.ctrlKey || e.metaKey) &&
      e.code === code.KEY_Z &&
      this.keyEvent.transaction
    );
  };

  public isCtrlY = (e: KeyboardEvent) => {
    return (
      (e.ctrlKey || e.metaKey) &&
      e.code === code.KEY_Y &&
      this.keyEvent.transaction
    );
  };

  public isCtrlX = (e: KeyboardEvent) => {
    return (
      (e.ctrlKey || e.metaKey) && e.code === code.KEY_X && this.keyEvent.cut
    );
  };
}

export default ShortcutHandler;
