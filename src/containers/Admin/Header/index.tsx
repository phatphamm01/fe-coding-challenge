import { useId, useMemo } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { useHandler } from '../Provider';

import { IChildrenProp } from '@/types/common';

import { getJsonToFile } from '@/assets/utils/download';

import { IObjectWebBuilder } from '@/core/web/types';

const HeaderContainer = styled.div`
  ${tw`w-full h-full border-b`}
`;

const HeaderBox = styled.div`
  ${tw`h-full flex items-center justify-center`}
`;

const ActionList = styled.ul`
  ${tw`flex gap-8 bg-red-500 px-8 py-2 rounded text-white font-medium cursor-pointer`}
`;

const ActionItem = styled.li`
  ${tw``}
`;

const Header: React.FC<IChildrenProp> = () => {
  const handler = useHandler();
  const actionList = useMemo(
    () => [
      {
        name: 'Save',
        onClick: () => {}
      },
      {
        name: 'Undo',
        onClick: () => {
          handler?.transactionHandler.undo();
        }
      },
      {
        name: 'Redo',
        onClick: () => {
          handler?.transactionHandler.redo();
        }
      },
      {
        name: 'Export',
        onClick: () => {
          handler?.exportJson();
        }
      },
      {
        name: 'Import',
        onClick: async () => {
          const obj = (await getJsonToFile()) as IObjectWebBuilder[];
          handler?.importJson(obj);
        }
      },
      {
        name: 'View',
        onClick: () => {}
      }
    ],
    [handler]
  );

  return (
    <HeaderContainer>
      <HeaderBox>
        <ActionList>
          {actionList.map((value) => (
            <ActionItem onClick={value.onClick} key={useId()}>
              {value.name}
            </ActionItem>
          ))}
        </ActionList>
      </HeaderBox>
    </HeaderContainer>
  );
};

export default Header;
