import { IObjectWebBuilder } from '../types';
import { Handler } from './Handler';

import { objectToMap } from '@/assets/utils/map';

class StorageHandler {
  handler: Handler;

  constructor(handler: Handler) {
    this.handler = handler;
  }

  public get = (): IObjectWebBuilder[] => {
    const source = localStorage.getItem('webBuilder');
    if (!source) return [];

    const obj = JSON.parse(source);

    return obj;
  };

  public getAsMap = () => {
    const source = this.get();

    return objectToMap(source);
  };

  public save = () => {
    localStorage.setItem(
      'webBuilder',
      JSON.stringify(this.handler.getObjectsAsArray())
    );
  };
}

export default StorageHandler;