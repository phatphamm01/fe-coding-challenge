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
  gap: string;

  background: string;
  borderRadius: string;
  boxShadow: string;

  children: string[];
}
