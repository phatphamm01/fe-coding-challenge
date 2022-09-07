import {
  IObjectButton,
  IObjectImage,
  IObjectList,
  IObjectParagraph,
  ITypeWebBuilder
} from '../types';

import { randomId } from '@/assets/common';

export const buttonDefaultObject: () => IObjectButton = () => ({
  id: randomId(),
  style: {
    display: { default: 'inline-block' },
    width: { default: '80%', tablet: '200px' },
    margin: { default: '20px' },
    padding: { default: '8px 12px' },
    borderRadius: { default: '4px' },
    border: {
      default: '1px solid #333'
    }
  },
  title: 'Button',
  type: 'button',
  message: 'Thông báo'
});

export const paragraphDefaultObject: () => IObjectParagraph = () => ({
  id: randomId(),
  style: { padding: { default: '8px 12px' } },
  title: { content: 'Paragraph', fontSize: '14px' },
  type: 'paragraph',
  display: 'block'
});

export const imageDefaultObject: () => IObjectImage = () => ({
  id: randomId(),
  style: {},
  name: 'Image',
  src: 'https://via.placeholder.com/150',
  type: 'image',
  objectFit: 'cover',
  height: '',
  width: ''
});

export const listDefaultObject: () => IObjectList = () => ({
  id: randomId(),
  style: {},
  data: ['item1', 'item2'],
  title: { content: 'Danh sách', fontSize: '14px' },
  type: 'list',
  listStyle: 'none'
});

const defaultObject: Record<ITypeWebBuilder, any> = {
  button: buttonDefaultObject,
  paragraph: paragraphDefaultObject,
  image: imageDefaultObject,
  list: listDefaultObject
};

export default defaultObject;
