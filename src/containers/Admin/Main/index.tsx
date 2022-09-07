import { useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import Config from './Config';
import Dragging from './Dragging';

import { IChildrenProp } from '@/types/common';

import PositionMouse from '@/containers/Admin/Main/PositionMouse';

import { useRerender } from '@/hooks/useRerender';

import WebBuilderObject from '@/core/web/objects';

import { useHandler } from '@/provider/HandlerProvider';

const MainContainer = styled.div`
  ${tw`relative border-b flex-grow overflow-y-auto`}
`;
const Container = styled.div`
  ${tw`h-full w-full overflow-auto p-2`}
`;
const Instances = styled.div`
  ${tw``}
`;

const Main: React.FC<IChildrenProp> = () => {
  const handler = useHandler();
  const forceUpdate = useRerender();

  useEffect(() => {
    handler?.eventHandler.onMulti(
      ['add', 'remove', 'changed', 'redo', 'undo', 'paste', 'selected'],
      () => {
        forceUpdate();
      }
    );

    return () => {
      handler?.eventHandler.unsubscribeOfMulti(
        ['add', 'remove', 'changed', 'redo', 'undo', 'paste', 'selected'],
        () => {
          forceUpdate();
        }
      );
    };
  }, [handler]);

  return (
    <MainContainer>
      <div tw="absolute space-y-2 right-4 bottom-4 w-[40vw] pointer-events-none z-0">
        <PositionMouse />
        <Dragging />
        <Instances>
          <b>Instances:</b> {handler?.getObjectsAsArray().length}
        </Instances>
        <Config />
      </div>

      <Container id={handler?.id}>
        {handler?.getObjectsAsArray().map((value) => {
          const Comp = WebBuilderObject[value.type].create({
            data: value
          });

          return (
            <Comp
              style={{
                outline: handler.target?.id === value.id ? '1px solid blue' : ''
              }}
              onClick={() => handler?.onSelected?.(value)}
              key={value.id}
              data={value}
            />
          );
        })}
      </Container>
    </MainContainer>
  );
};

export default Main;
