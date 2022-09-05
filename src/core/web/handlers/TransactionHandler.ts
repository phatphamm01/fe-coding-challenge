import throttle from 'lodash/throttle';

import { IObjectWebBuilder } from '../types/core';
import { Handler, IObject } from './Handler';

import { cloneMap, mapToObject, objectToMap } from '@/assets/utils/map';

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
  private state: IObject;

  constructor(handler: Handler) {
    this.handler = handler;
    this.initialize();
  }

  public initialize = () => {
    this.redos = [];
    this.undos = [];
    this.state = new Map();
  };

  public setState = (state: IObject) => {
    this.state = cloneMap(state);
  };

  public save = (type: TransactionType) => {
    try {
      if (this.state) {
        const json = JSON.stringify(mapToObject(this.state));

        this.redos = [];
        this.undos.push({
          type,
          json
        });
      }

      this.setState(this.handler.getMapObjects());
    } catch (error) {
      console.error(error);
    }
  };

  public undo = throttle(() => {
    const undo = this.undos.pop();

    if (!undo) return;

    this.redos.push({
      type: 'redo',
      json: JSON.stringify(mapToObject(this.state))
    });

    this.handler.eventHandler.emit('undo', undo);
    this.replay(undo);
  }, 100);

  public redo = throttle(() => {
    const redo = this.redos.pop();

    if (!redo) return;

    this.undos.push({
      type: 'undo',
      json: JSON.stringify(mapToObject(this.state))
    });

    this.handler.eventHandler.emit('redo', redo);
    this.replay(redo);
  }, 100);

  public replay = (transaction: TransactionEvent) => {
    const objects = JSON.parse(transaction.json) as IObjectWebBuilder[];
    const objectMap = objectToMap(objects);
    this.handler.setObjects(objectMap);
    this.setState(objectMap);
  };
}

export default TransactionHandler;
