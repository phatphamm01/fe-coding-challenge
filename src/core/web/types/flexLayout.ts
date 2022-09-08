import { Property } from 'csstype';

import { IObjectWebBuilder } from './core';

export interface IObjectFlexLayout extends IObjectWebBuilder {
  height?: string;
  width?: string;
  flexDirection: Property.FlexDirection;
  justifyContent: Property.JustifyContent;
  alignItems: Property.AlignItems;

  padding: string;
  margin: string;

  children: string[];
}
