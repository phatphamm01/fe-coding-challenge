import { Handler } from './Handler';

class EventHandler {
  handler: Handler;
  code: string;
  panning: boolean;

  constructor(handler: Handler) {
    this.handler = handler;
    this.initialize();
  }

  public initialize() {
    if (this.handler.editable) {
      document.addEventListener('keydown', this.keydown, false);
    } else {
    }
  }

  public destroy = () => {
    if (this.handler.editable) {
      document.removeEventListener('keydown', this.keydown, false);
    } else {
    }
  };

  public keydown = (e: KeyboardEvent) => {
    const { keyEvent, editable } = this.handler;

    if ((e?.target as any).nodeName === 'INPUT') return;

    if (editable) {
      if (this.handler.shortcutHandler.isDelete(e)) {
        this.handler.remove();
      } else if (this.handler.shortcutHandler.isCtrlC(e)) {
        e.preventDefault();
        this.handler.copy();
      } else if (
        this.handler.shortcutHandler.isCtrlV(e) &&
        !keyEvent.clipboard
      ) {
        e.preventDefault();
        this.handler.paste();
      } else if (this.handler.shortcutHandler.isCtrlX(e)) {
        e.preventDefault();
        this.handler.cut();
      } else if (this.handler.shortcutHandler.isCtrlZ(e)) {
        e.preventDefault();
        this.handler.transactionHandler.undo();
      } else if (this.handler.shortcutHandler.isCtrlY(e)) {
        e.preventDefault();
        this.handler.transactionHandler.redo();
      }
      return;
    }
    return;
  };
}

export default EventHandler;
