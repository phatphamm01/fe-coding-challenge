import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import Button from './Button';
import FlexLayout from './FlexLayout';
import Image from './Image';
import List from './List';
import Paragraph from './Paragraph';

import { IChildrenProp } from '@/types/common';

import { useRerender } from '@/hooks/useRerender';

import {
  IObjectButton,
  IObjectFlexLayout,
  IObjectImage,
  IObjectList,
  IObjectParagraph,
  ITypeWebBuilder
} from '@/core/web/types';

import { useHandler } from '@/provider/HandlerProvider';

const EditElementContainer = styled.div`
  ${tw`h-[30vh] overflow-auto`}
`;

const EditElementBox = styled.div`
  ${tw`px-6 py-4`}
`;

const EditElement: React.FC<IChildrenProp> = () => {
  const handler = useHandler();
  const forceUpdate = useRerender();

  const targetEl =
    handler?.target && document.getElementById(handler?.target.id);

  useEffect(() => {
    handler?.eventManagerHandler.onMulti(['selected', 'changed'], () => {
      forceUpdate();
    });

    return () => {
      handler?.eventManagerHandler.unsubscribeOfMulti(
        ['selected', 'changed'],
        () => {
          forceUpdate();
        }
      );
    };
  });

  const renderOption: Record<ITypeWebBuilder, any> = useMemo(
    () => ({
      button: (value: IObjectButton) => <Button value={value} />,
      paragraph: (value: IObjectParagraph) => <Paragraph value={value} />,
      image: (value: IObjectImage) => <Image value={value} />,
      list: (value: IObjectList) => <List value={value} />,
      flexLayout: (value: IObjectFlexLayout) => <FlexLayout value={value} />
    }),
    [handler]
  );

  return (
    <EditElementContainer>
      {targetEl && (
        <EditElementBox>
          {handler?.target?.type &&
            renderOption[handler?.target?.type](handler?.target)}
        </EditElementBox>
      )}
    </EditElementContainer>
  );
};

export default EditElement;
