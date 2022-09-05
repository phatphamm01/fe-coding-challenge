import { ITypeWebBuilder } from '../types';
import Button from './Button';
import Paragraph from './Paragraph';

export interface ObjectSchema {
  create: (...option: any) => React.FC<{ data: any }>;
}

export type WebBuilderObjectSchema = Record<ITypeWebBuilder, ObjectSchema>;

export const createWebBuilderObject = (objectSchema: WebBuilderObjectSchema) =>
  objectSchema;

const WebBuilderObject: WebBuilderObjectSchema = {
  button: {
    create: () => Button
  },
  paragraph: {
    create: () => Paragraph
  }
};

export default WebBuilderObject;
