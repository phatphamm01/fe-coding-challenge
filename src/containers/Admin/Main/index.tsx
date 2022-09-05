import { useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { useHandler } from '../Provider';

import { IChildrenProp } from '@/types/common';

import { useRerender } from '@/hooks/useRerender';

import WebBuilderObject from '@/core/web/objects';

const MainContainer = styled.div`
  ${tw`border-b flex-grow overflow-y-auto`}
`;
const Container = styled.div`
  ${tw`h-full w-full overflow-auto`}
`;

const Main: React.FC<IChildrenProp> = () => {
  const handler = useHandler();
  const forceUpdate = useRerender();

  useEffect(() => {
    handler?.eventHandler.onMulti(
      ['add', 'remove', 'changed', 'redo', 'undo', 'paste'],
      () => {
        forceUpdate();
      }
    );

    return () => {
      handler?.eventHandler.unsubscribeOfMulti(
        ['add', 'remove', 'changed', 'redo', 'undo', 'paste'],
        () => {
          forceUpdate();
        }
      );
    };
  }, [handler]);

  return (
    <MainContainer>
      <Container id={handler?.id}>
        {handler?.getObjects().map((value) => {
          const Comp = WebBuilderObject[value.type].create({
            data: value
          });

          return <Comp key={value.id} data={value} />;
        })}
      </Container>
    </MainContainer>
  );
};

export default Main;
