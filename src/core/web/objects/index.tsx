import React, { DetailedHTMLProps } from 'react';

import { ITypeWebBuilder } from '../types';
import Button from './Button';
import Image from './Image';
import List from './List';
import Paragraph from './Paragraph';

export interface ObjectSchema {
  create: (
    ...option: any
  ) => React.FC<
    | DetailedHTMLProps<React.AllHTMLAttributes<HTMLElement>, HTMLElement>
    | { data: any }
  >;
}

export type WebBuilderObjectSchema = Record<ITypeWebBuilder, ObjectSchema>;

export const createWebBuilderObject = (objectSchema: WebBuilderObjectSchema) =>
  objectSchema;

const WebBuilderObject: WebBuilderObjectSchema = {
  button: {
    create: () => Button as any
  },
  paragraph: {
    create: () => Paragraph as any
  },
  image: {
    create: () => Image as any
  },
  list: {
    create: () => List as any
  }
};

export default WebBuilderObject;
