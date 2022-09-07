import styled from 'styled-components';
import tw from 'twin.macro';

import { IChildrenProp } from '@/types/common';

import WebBuilderObject from '@/core/web/objects';

import { useHandler } from '@/provider/HandlerProvider';

const ConsumerPageContainer = styled.div`
  ${tw`w-full`}
`;

const Container = styled.div`
  ${tw`h-full w-full flex flex-col items-center overflow-auto`}
`;

const ConsumerPage: React.FC<IChildrenProp> = () => {
  const handler = useHandler();
  console.log({ data: handler?.storageHandler?.get() });

  return (
    <ConsumerPageContainer>
      <Container>
        {handler?.storageHandler?.get()?.map((value) => {
          const Comp = WebBuilderObject[value.type].create({
            data: value
          });

          return <Comp key={value.id} data={value} />;
        })}
      </Container>
    </ConsumerPageContainer>
  );
};

export default ConsumerPage;
