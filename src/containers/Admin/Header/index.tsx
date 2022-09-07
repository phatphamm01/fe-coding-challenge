import { useId, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import tw from 'twin.macro';

import { IChildrenProp } from '@/types/common';

import { getJsonToFile } from '@/assets/utils/download';

import { IObjectWebBuilder } from '@/core/web/types';

import { useHandler } from '@/provider/HandlerProvider';

const HeaderContainer = styled.div`
  ${tw`w-full h-full border-b`}
`;

const HeaderBox = styled.div`
  ${tw`h-full flex items-center justify-center`}
`;

const ActionList = styled.ul`
  ${tw`flex bg-red-500 rounded text-white font-medium cursor-pointer`}
`;

const ActionItem = styled.li`
  ${tw`px-6 py-2`}
`;

const Header: React.FC<IChildrenProp> = () => {
  const handler = useHandler();
  const navigate = useNavigate();

  const actionList = useMemo(
    () => [
      {
        name: 'Clear',
        onClick: () => {
          handler?.reset();
        }
      },
      {
        name: 'Save',
        onClick: () => {
          handler?.storageHandler.save();
        }
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
        onClick: () => {
          navigate('./consumer');
        }
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
