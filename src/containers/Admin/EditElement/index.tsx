import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { useHandler } from '../Provider';

import { IChildrenProp } from '@/types/common';

import Input from '@/design/Input';

import { useRerender } from '@/hooks/useRerender';

import {
  IObjectButton,
  IObjectParagraph,
  ITypeWebBuilder
} from '@/core/web/types';

const EditElementContainer = styled.div`
  ${tw`h-[30vh]`}
`;

const EditElementBox = styled.div`
  ${tw`px-6 pt-4`}
`;

const EditElement: React.FC<IChildrenProp> = () => {
  const handler = useHandler();
  const forceUpdate = useRerender();

  useEffect(() => {
    handler?.eventHandler.on('selected', (value) => {
      forceUpdate();
    });
  }, [handler]);

  const renderOption: Record<ITypeWebBuilder, any> = useMemo(
    () => ({
      button: (value: IObjectButton) => (
        <div key={value.id} className="grid gap-6 mb-6 grid-cols-2">
          <Input
            title="Title"
            name="title"
            value={value.title}
            onChange={(val) => {
              handler?.modifyObject(value, { key: 'title', value: val });
            }}
          />
          <Input title="Alert" name="title" value={value.alert} />
        </div>
      ),
      paragraph: (value: IObjectParagraph) => (
        <div key={value.id} className="grid gap-6 mb-6 grid-cols-2">
          <Input
            title="Title"
            name="title"
            value={value.title}
            onChange={(val) => {
              handler?.modifyObject(value, { key: 'title', value: val });
            }}
          />
        </div>
      )
    }),
    [handler]
  );

  return (
    <EditElementContainer>
      <EditElementBox>
        {handler?.target?.type &&
          renderOption[handler?.target?.type](handler?.target)}
      </EditElementBox>
    </EditElementContainer>
  );
};

export default EditElement;
