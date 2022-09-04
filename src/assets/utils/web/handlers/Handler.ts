import { IObjectWebBuilder, KeyEvent } from '../types/core';

export interface HandlerOption {
  id?: string;
  container?: HTMLDivElement;
  editable?: boolean;
  keyEvent?: KeyEvent;
  objects?: IObjectWebBuilder;
  [key: string]: any;
}

export interface HandlerCallback {
  onAdd?: (object: IObjectWebBuilder) => void;

  onContext?: (
    el: HTMLDivElement,
    e: React.MouseEvent,
    target?: IObjectWebBuilder
  ) => Promise<any> | any;

  onTooltip?: (
    el: HTMLDivElement,
    target?: IObjectWebBuilder
  ) => Promise<any> | any;

  onZoom?: (zoomRatio: number) => void;

  onClick?: (container: HTMLDivElement, target: IObjectWebBuilder) => void;

  onDblClick?: (container: HTMLDivElement, target: IObjectWebBuilder) => void;

  onModified?: (target: IObjectWebBuilder) => void;

  onSelect?: (target: IObjectWebBuilder) => void;

  onRemove?: (target: IObjectWebBuilder) => void;
}

export type HandlerOptions = HandlerOption & HandlerCallback;

class Handler implements HandlerOptions {
  public id: string;
  public container: HTMLDivElement;
}
