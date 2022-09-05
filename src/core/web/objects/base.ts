import { IObjectButton, IObjectParagraph, ITypeWebBuilder } from '../types';

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
  type: 'button'
});

export const paragraphDefaultObject: () => IObjectParagraph = () => ({
  id: randomId(),
  style: { padding: { default: '8px 12px' } },
  title: 'Paragraph',
  type: 'paragraph'
});

const defaultObject: Record<ITypeWebBuilder, any> = {
  button: buttonDefaultObject,
  paragraph: paragraphDefaultObject
};

export default defaultObject;
