import throttle from 'lodash/throttle';

import { IObjectWebBuilder } from '../types/core';
import { Handler } from './Handler';

export type TransactionType =
  | 'add'
  | 'remove'
  | 'changed'
  | 'paste'
  | 'redo'
  | 'undo';

export interface TransactionEvent {
  json: string;
  type: TransactionType;
}

class TransactionHandler {
  private handler: Handler;
  private redos: TransactionEvent[];
  private undos: TransactionEvent[];
  private state: IObjectWebBuilder[] = [];

  constructor(handler: Handler) {
    this.handler = handler;
    this.initialize();
  }

  public initialize = () => {
    this.redos = [];
    this.undos = [];
    this.state = [];
  };

  public setState = (state: IObjectWebBuilder[]) => {
    const newState = [...state];
    this.state = newState;
  };

  public save = (type: TransactionType) => {
    try {
      if (this.state) {
        const json = JSON.stringify(this.state);

        this.redos = [];
        this.undos.push({
          type,
          json
        });
      }

      this.setState(this.handler.getObjects());
    } catch (error) {
      console.error(error);
    }
  };

  public undo = throttle(() => {
    const undo = this.undos.pop();

    if (!undo) return;

    this.redos.push({
      type: 'redo',
      json: JSON.stringify(this.state)
    });

    this.handler.eventHandler.emit('undo', undo);
    this.replay(undo);
  }, 100);

  public redo = throttle(() => {
    const redo = this.redos.pop();

    if (!redo) return;

    this.undos.push({
      type: 'undo',
      json: JSON.stringify(this.state)
    });

    this.handler.eventHandler.emit('redo', redo);
    this.replay(redo);
  }, 100);

  public replay = (transaction: TransactionEvent) => {
    const objects = JSON.parse(transaction.json) as IObjectWebBuilder[];
    this.handler.setObjects(objects);
    this.setState(objects);
  };
}

export default TransactionHandler;
