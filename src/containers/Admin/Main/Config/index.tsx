import { prettyPrintJson } from 'pretty-print-json';
import { useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { IChildrenProp } from '@/types/common';

import '@/assets/scss/pretty-print-json.scss';

import { useRerender } from '@/hooks/useRerender';

import { useHandler } from '@/provider/HandlerProvider';

const ConfigContainer = styled.div`
  ${tw``}
`;

const Config: React.FC<IChildrenProp> = () => {
  const handler = useHandler();
  const forceUpdate = useRerender();

  useEffect(() => {
    handler?.eventHandler.onMulti(['selected', 'changed'], () => {
      forceUpdate();
    });

    return () => {
      handler?.eventHandler.unsubscribeOfMulti(['selected', 'changed'], () => {
        forceUpdate();
      });
    };
  }, [handler]);

  const objectSelected =
    handler?.target?.id && handler?.findObjectById(handler.target?.id);

  return (
    <ConfigContainer>
      <b>Config: </b>
      <div
        tw="inline"
        dangerouslySetInnerHTML={{
          __html: prettyPrintJson.toHtml(objectSelected || '💦', {})
        }}
      />
    </ConfigContainer>
  );
};

export default Config;
