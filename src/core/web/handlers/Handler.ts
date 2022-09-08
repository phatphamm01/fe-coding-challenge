import { defaults } from '../constants';
import { IObjectWebBuilder, KeyEvent } from '../types/core';
import { EventHandler } from './EventHandler';
import { NotifyHandler } from './NotifyHandler';
import { StorageHandler } from './StorageHandler';
import { TransactionHandler } from './TransactionHandler';
import { UtilsHandler } from './UtilsHandler';

import { saveTemplateAsFile } from '@/assets/utils/download';
import { objectToMap } from '@/assets/utils/map';

export type IObject = Map<string, IObjectWebBuilder>;
export interface HandlerOption {
  id: string;
  container?: HTMLDivElement;
  editable?: boolean;
  keyEvent?: KeyEvent;
  objects?: IObject;
  [key: string]: any;
}

export interface HandlerCallback {
  onAdd?: (object: IObjectWebBuilder) => void;

  onClick?: (container: HTMLDivElement, target: IObjectWebBuilder) => void;

  onDblClick?: (container: HTMLDivElement, target: IObjectWebBuilder) => void;

  onModified?: (target: IObjectWebBuilder) => void;

  onSelect?: (target: IObjectWebBuilder) => void;

  onRemove?: (target: IObjectWebBuilder) => void;
}

export type HandlerOptions = HandlerOption & HandlerCallback;

export class Handler implements HandlerOptions {
  public id: string;
  public container?: HTMLDivElement;
  public editable?: boolean;
  public keyEvent?: KeyEvent = defaults.keyEvent;

  public onAdd?: (object: IObjectWebBuilder) => void;
  public onClick?: (
    container: HTMLDivElement,
    target: IObjectWebBuilder
  ) => void;
  public onDblClick?: (
    container: HTMLDivElement,
    target: IObjectWebBuilder
  ) => void;
  public onModified?: (target: IObjectWebBuilder) => void;
  public onSelect?: (target: IObjectWebBuilder) => void;
  public onRemove?: (target: IObjectWebBuilder) => void;

  public transactionHandler: TransactionHandler;
  public eventHandler: EventHandler;
  public storageHandler: StorageHandler;
  public notifyHandler: NotifyHandler;
  public utilsHandler: UtilsHandler;

  public objects: IObject;
  public target?: IObjectWebBuilder;

  constructor(options: HandlerOptions) {
    this.initialize(options);
  }

  public initialize(options: HandlerOptions) {
    this.initOption(options);
    this.initCallback(options);
    this.initHandler();
  }

  public initOption = (options: HandlerOptions) => {
    this.id = options.id;
    this.container = options.container;
    this.editable = !!options?.editable;
    this.objects = new Map();
    this.setKeyEvent(options.keyEvent || defaults.keyEvent);
  };

  public initCallback = (options: HandlerOptions) => {
    this.onAdd = defaultValue(options.onAdd);
    this.onClick = defaultValue(options.onClick);
    this.onModified = defaultValue(options.onModified);
    this.onDblClick = defaultValue(options.onDblClick);
    this.onSelect = defaultValue(options.onSelect);
    this.onRemove = defaultValue(options.onRemove);
  };

  public initHandler = () => {
    this.transactionHandler = new TransactionHandler(this);
    this.eventHandler = new EventHandler(this);
    this.storageHandler = new StorageHandler(this);
    this.notifyHandler = new NotifyHandler(this);
    this.utilsHandler = new UtilsHandler(this);
  };

  public getMapObjects = (): IObject => {
    return this.objects;
  };

  public getObjectsAsArray = (): IObjectWebBuilder[] => {
    const objAgain = Object.fromEntries(this.getMapObjects());
    return Object.keys(objAgain).map((value) => objAgain[value]) || [];
  };

  public setObjects = (obj: IObject): void => {
    this.objects = obj;

    this.eventHandler.emit('changed', obj);
  };

  public getContainer = () => {
    return document.getElementById(this.id);
  };

  public onSelected = (obj: IObjectWebBuilder) => {
    this.target = obj;

    this.eventHandler.emit('selected', obj);
  };

  public findObjectById = (id: string) => {
    return this.getMapObjects().get(id);
  };

  public add = (obj: IObjectWebBuilder) => {
    this.objects.set(obj.id, obj);
    this.eventHandler.emit('add', obj);
    this.transactionHandler.save('add');
  };

  public remove = (obj: IObjectWebBuilder) => {
    this.removeById(obj.id);
  };

  public removeById = (id: string) => {
    this.clear();
    this.objects.delete(id);

    this.eventHandler.emit('remove', id);
    this.transactionHandler.save('remove');
  };

  public setKeyEvent = (keyEvent: KeyEvent) => {
    this.keyEvent = Object.assign({}, this.keyEvent, keyEvent);
  };

  public exportJson = () => {
    saveTemplateAsFile('data.json', this.getObjectsAsArray());
    this.notifyHandler.notify('success', 'Export Success');
  };

  public importJson = (source: IObjectWebBuilder[]) => {
    const map = objectToMap(source);

    this.setObjects(map);
    this.transactionHandler.save('changed');
    this.notifyHandler.notify('success', 'Import Success');
  };

  public importDataStorage = (source: IObjectWebBuilder[]) => {
    const map = objectToMap(source);

    this.setObjects(map);
    this.transactionHandler.save('changed');
  };

  public modifyObject = <T = string>(
    obj: IObjectWebBuilder,
    { key, value }: { key: keyof IObjectWebBuilder; value: T }
  ) => {
    let newObj = this.objects.get(obj.id);
    if (!newObj) return;

    newObj = { ...newObj, [key]: value };
    this.objects.set(obj.id, newObj);

    this.eventHandler.emit('changed', newObj);
  };

  public clear = () => {
    this.target = undefined;
    this.eventHandler.emit('selected', null);
  };

  public reset = () => {
    this.clear();
    this.objects = new Map();
    this.storageHandler.reset();

    this.eventHandler.emit('changed', null);
    this.transactionHandler.save('changed');
    this.notifyHandler.notify('success', 'Clear Success');
  };
}

const defaultValue = (value: any) => {
  if (value instanceof Function) {
    return value;
  }
  return () => {};
};
