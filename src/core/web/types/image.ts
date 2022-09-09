import { Property } from 'csstype';

import { IObjectWebBuilder } from './core';

export interface IObjectImage extends IObjectWebBuilder {
  name: string;
  src: string;
  height: string;
  width: string;
  objectFit: Property.ObjectFit;
  borderRadius: string;
}
