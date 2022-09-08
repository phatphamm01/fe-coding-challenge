import { useId, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { IIngredient, ingredientList } from './constant';

import { IChildrenProp } from '@/types/common';

import useDraggable from '@/hooks/useDraggable';

import defaultObject from '@/core/web/objects/base';
import { IObjectFlexLayout, IObjectWebBuilder } from '@/core/web/types';

import { useDraggingHandler } from '@/provider/DraggingProvider';
import { useHandler } from '@/provider/HandlerProvider';

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

interface IIngredientItem {
  item: IIngredient;
}

const IngredientItem: React.FC<IIngredientItem> = ({ item }) => {
  const handler = useHandler();
  const draggingHandler = useDraggingHandler();
  const [isMove, setIsMove] = useState<boolean>(false);

  const { target } = useDraggable<HTMLDivElement>({
    delay: 150,
    onStart(event, target, setPosition) {
      target.style.pointerEvents = 'none';
      draggingHandler.dispatch({ type: 'CHANGE_NAME', data: item.name });

      setIsMove(true);
    },
    onEnd(event, target, positionInit, setPosition) {
      setPosition(positionInit);
      target.style.transition = 'transform 150ms ease-in';
    },
    onDelayEnd(event, target, positionInit, setPosition) {
      (target.style as any) = '';
      draggingHandler.dispatch({ type: 'CHANGE_NAME', data: '' });
      setIsMove(false);
    },
    onDropAtElement(event, target, elements) {
      const elementsAsHTMLElement = elements as HTMLElement[];
      const container = handler?.getContainer();

      if (!container) return;

      const element = elementsAsHTMLElement?.find((value) => {
        const type = value?.dataset?.type;
        if (!type) return false;
        if (type === 'main' || type === 'layout') return true;
        return false;
      });

      if (!element) return;

      if (element.dataset.type === 'main') {
        handler?.add(defaultObject[item.type]());
      }

      if (element.dataset.type === 'layout') {
        const object = handler
          ?.getMapObjects()
          .get(element.id) as IObjectFlexLayout;
        if (!object) return;

        const newObject = defaultObject[item.type]() as IObjectWebBuilder;
        newObject.root = object.id;

        handler?.add(newObject);

        handler?.modifyObject(object, {
          key: 'children',
          value: [...object.children, newObject.id]
        });
      }
    }
  });

  return (
    <IngredientEl.Box>
      <IngredientEl.Drag ref={target}>
        <IngredientEl.Image />
        <IngredientEl.Title>{item.name}</IngredientEl.Title>
      </IngredientEl.Drag>
      {isMove && (
        <IngredientEl.Drag>
          <IngredientEl.Image />
          <IngredientEl.Title>{item.name}</IngredientEl.Title>
        </IngredientEl.Drag>
      )}
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
