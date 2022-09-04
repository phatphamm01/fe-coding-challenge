import { useId } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { IChildrenProp } from '@/types/common';

import useDraggable from '@/hooks/useDraggable';

const IngredientContainer = styled.div`
  ${tw`h-full w-48 border-r`}
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
  type: string;
};

interface IIngredientItem {
  item: IIngredient;
}

const IngredientItem: React.FC<IIngredientItem> = ({ item }) => {
  const { target } = useDraggable<HTMLDivElement>({
    onEnd(event, target, positionInit, setPosition) {
      (target.style as any) = '';
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
