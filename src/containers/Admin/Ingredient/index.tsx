import { useId } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { useHandler } from '../Provider';

import { IChildrenProp } from '@/types/common';

import useDraggable from '@/hooks/useDraggable';

import defaultObject from '@/core/web/objects/base';
import { ITypeWebBuilder } from '@/core/web/types';

const IngredientContainer = styled.div`
  ${tw`h-[inherit] w-48 border-r overflow-y-auto`}
`;

const IngredientList = styled.ul`
  ${tw`flex flex-col items-center`}
`;

const IngredientEl = {
  Box: styled.li`
    ${tw`w-full`}
    aspect-ratio: 1/1;
  `,
  Drag: styled.div`
    ${tw`w-full h-full flex flex-col items-center justify-center`}
  `,
  Image: styled.div`
    ${tw`h-[100px] w-[100px] border rounded shadow bg-white`}
  `,
  Title: styled.p`
    ${tw`mt-2 text-center`}
  `
};

type IIngredient = {
  name: string;
  type: ITypeWebBuilder;
};

interface IIngredientItem {
  item: IIngredient;
}

const IngredientItem: React.FC<IIngredientItem> = ({ item }) => {
  const handler = useHandler();

  const { target } = useDraggable<HTMLDivElement>({
    onStart(event, target, setPosition) {
      target.style.pointerEvents = 'none';
    },
    onEnd(event, target, positionInit, setPosition) {
      (target.style as any) = '';
    },
    onDropAtElement(event, target, element) {
      const container = handler?.getContainer();
      if (!container) return;
      if (!container.contains(element)) return;

      handler?.add(defaultObject[item.type]());
    }
  });

  return (
    <IngredientEl.Box>
      <IngredientEl.Drag ref={target}>
        <IngredientEl.Image />
        <IngredientEl.Title>{item.name}</IngredientEl.Title>
      </IngredientEl.Drag>
    </IngredientEl.Box>
  );
};

const Ingredient: React.FC<IChildrenProp> = () => {
  return (
    <IngredientContainer>
      <IngredientList>
        {ingredientList.map((item) => (
          <IngredientItem item={item} key={useId()} />
        ))}
      </IngredientList>
    </IngredientContainer>
  );
};

export default Ingredient;

const ingredientList: IIngredient[] = [
  {
    name: 'Paragraph',
    type: 'paragraph'
  },
  {
    name: 'Button',
    type: 'button'
  }
];
