import { useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { IChildrenProp } from '@/types/common';

import { useRerender } from '@/hooks/useRerender';

import { useHandler } from '@/provider/HandlerProvider';

const ConsumerPageContainer = styled.div`
  ${tw`w-full`}
`;

const Container = styled.div`
  ${tw`h-full w-full overflow-auto`}
`;

const ConsumerPage: React.FC<IChildrenProp> = () => {
  const handler = useHandler();

  const forceUpdate = useRerender();

  useEffect(() => {
    handler?.eventManagerHandler.onMulti(['changed'], () => {
      forceUpdate();
    });

    return () => {
      handler?.eventManagerHandler.unsubscribeOfMulti(['changed'], () => {
        forceUpdate();
      });
    };
  }, [handler]);

  return (
    <ConsumerPageContainer>
      <Container>
        {handler?.utilsHandler.renderElement(handler?.getObjectsAsArray())}
      </Container>
    </ConsumerPageContainer>
  );
};

export default ConsumerPage;
