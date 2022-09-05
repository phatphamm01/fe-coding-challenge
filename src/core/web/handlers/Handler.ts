import { defaults } from '../constants';
import { IObjectWebBuilder, KeyEvent } from '../types/core';
import EventHandler from './EventHandler';
import TransactionHandler from './TransactionHandler';

import { saveTemplateAsFile } from '@/assets/utils/download';

export interface HandlerOption {
  id: string;
  container?: HTMLDivElement;
  editable?: boolean;
  keyEvent?: KeyEvent;
  objects?: IObjectWebBuilder[];
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

  public objects: IObjectWebBuilder[];
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
    this.objects = [];
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
  };

  public getObjects = (): IObjectWebBuilder[] => {
    return this.objects;
  };

  public setObjects = (obj: IObjectWebBuilder[]): void => {
    this.objects = obj;

    this.eventHandler.emit('changed', obj);
    this.transactionHandler.save('changed');
  };

  public getContainer = () => {
    return document.getElementById(this.id);
  };

  public selected = (obj: IObjectWebBuilder) => {
    this.target = obj;
  };

  public add = (obj: IObjectWebBuilder) => {
    this.objects.push(obj);
    this.eventHandler.emit('add', obj);
    this.transactionHandler.save('add');
  };

  public remove = (obj: IObjectWebBuilder) => {
    this.objects.filter((value) => value.id !== obj.id);
    this.eventHandler.emit('remove', obj);
    this.transactionHandler.save('remove');
  };

  public removeById = (id: string) => {
    this.objects.filter((value) => value.id !== id);
    this.eventHandler.emit('remove', id);
    this.transactionHandler.save('remove');
  };

  public setKeyEvent = (keyEvent: KeyEvent) => {
    this.keyEvent = Object.assign({}, this.keyEvent, keyEvent);
  };

  public exportJson = () => {
    saveTemplateAsFile('data.json', this.getObjects());
  };
}

const defaultValue = (value: any) => {
  if (value instanceof Function) {
    return value;
  }
  return () => {};
};
