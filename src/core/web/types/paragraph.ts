import { Property } from 'csstype';

import { IString } from './common';
import { IObjectWebBuilder } from './core';

export interface IObjectParagraph extends IObjectWebBuilder {
  title: IString;
  display: Property.Display;
  link?: string;
}
