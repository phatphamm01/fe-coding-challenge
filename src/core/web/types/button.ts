import { Property } from 'csstype';

import { IObjectWebBuilder } from './core';

export interface IObjectButton extends IObjectWebBuilder {
  title: string;
  message: string;
  width: string;
  height: string;
  display: Property.Display;
}
