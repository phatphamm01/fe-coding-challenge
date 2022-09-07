import { Property } from 'csstype';

import { IString } from './common';
import { IObjectWebBuilder } from './core';

export interface IObjectList extends IObjectWebBuilder {
  title: IString;
  data: string[];
  listStyle: Property.ListStyle;
}
