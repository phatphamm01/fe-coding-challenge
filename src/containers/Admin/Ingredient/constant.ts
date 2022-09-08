import { ITypeWebBuilder } from '@/core/web/types';

export type IIngredient = {
  name: string;
  type: ITypeWebBuilder;
};

export const ingredientList: IIngredient[] = [
  {
    name: 'Paragraph',
    type: 'paragraph'
  },
  {
    name: 'Button',
    type: 'button'
  },
  {
    name: 'Image',
    type: 'image'
  },
  {
    name: 'List',
    type: 'list'
  },
  { name: 'Flex Layout', type: 'flexLayout' }
];
