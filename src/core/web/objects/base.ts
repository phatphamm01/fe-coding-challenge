import {
  IObjectButton,
  IObjectFlexLayout,
  IObjectImage,
  IObjectList,
  IObjectParagraph,
  ITypeWebBuilder
} from '../types';

import { randomId } from '@/assets/common';

export const buttonDefaultObject: () => IObjectButton = () => ({
  id: randomId(),
  style: {
    width: { default: '80%', tablet: '200px' },
    borderRadius: { default: '4px' },
    border: {
      default: '1px solid #333'
    }
  },
  width: '',
  height: '',
  margin: '4px',
  padding: '4px',
  title: 'Button',
  type: 'button',
  message: 'Thông báo',
  display: 'block'
});

export const paragraphDefaultObject: () => IObjectParagraph = () => ({
  id: randomId(),
  style: { padding: { default: '8px 12px' } },
  margin: '4px',
  padding: '4px',
  title: { content: 'Paragraph', fontSize: '14px' },
  type: 'paragraph',
  display: 'block',
  textAlign: 'start'
});

export const imageDefaultObject: () => IObjectImage = () => ({
  id: randomId(),
  style: {},
  margin: '4px',
  padding: '4px',
  name: 'Image',
  src: 'https://via.placeholder.com/150',
  type: 'image',
  objectFit: 'cover',
  height: '',
  width: '',
  borderRadius: ''
});

export const listDefaultObject: () => IObjectList = () => ({
  id: randomId(),
  style: {},
  margin: '4px',
  padding: '4px',
  data: ['item1', 'item2'],
  title: { content: 'Danh sách', fontSize: '14px' },
  type: 'list',
  listStyle: 'none'
});

export const flexLayoutDefaultObject: () => IObjectFlexLayout = () => ({
  id: randomId(),
  style: {},
  type: 'flexLayout',
  children: [],
  width: '',
  height: '200px',
  alignItems: 'unset',
  flexDirection: 'unset',
  justifyContent: 'unset',
  padding: '4px',
  margin: '',
  gap: '',
  background: '',
  borderRadius: '',
  boxShadow: ''
});

const defaultObject: Record<ITypeWebBuilder, any> = {
  button: buttonDefaultObject,
  paragraph: paragraphDefaultObject,
  image: imageDefaultObject,
  list: listDefaultObject,
  flexLayout: flexLayoutDefaultObject
};

export default defaultObject;
