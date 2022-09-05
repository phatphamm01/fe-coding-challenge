import { useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { IChildrenProp } from '@/types/common';

import { useRerender } from '@/hooks/useRerender';

import { useHandler } from '@/provider/HandlerProvider';

const ConfigContainer = styled.div`
  ${tw``}
`;

const Config: React.FC<IChildrenProp> = () => {
  const handler = useHandler();
  const forceUpdate = useRerender();

  useEffect(() => {
    handler?.eventHandler.on('selected', () => {
      forceUpdate();
    });

    return () => {
      handler?.eventHandler.unsubscribeOf('selected', () => {
        forceUpdate();
      });
    };
  }, [handler]);

  return (
    <ConfigContainer>
      <b>Config:</b> {JSON.stringify(handler?.target)}
    </ConfigContainer>
  );
};

export default Config;
