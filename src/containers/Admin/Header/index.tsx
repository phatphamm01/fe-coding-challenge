import { useEffect, useId, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

import { IChildrenProp } from '@/types/common';

import { getJsonToFile } from '@/assets/utils/download';
import CancelIcon from '@/icons/Cancel';

import { useRerender } from '@/hooks/useRerender';

import fetchWebPage from '@/services/webPage';

import { IObjectWebBuilder } from '@/core/web/types';

import { useHandler } from '@/provider/HandlerProvider';

const HeaderContainer = styled.div`
  ${tw`w-full h-full relative border-b`}
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

  const targetEl =
    handler?.target && document.getElementById(handler?.target.id);

  const forceUpdate = useRerender();

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
          const id = handler?.id;
          if (!id) return;

          fetchWebPage.update({
            _id: id,
            data: {
              json: JSON.stringify(handler?.getObjectsAsArray() || {})
            }
          });

          handler.notifyHandler.notify('success', 'Update Success');
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
          navigate('/consumer/' + handler?.id);
        }
      }
    ],
    [handler]
  );

  const handleDelete = () => {
    handler?.remove();
  };

  return (
    <HeaderContainer>
      <div className="absolute cursor-pointer top-[50%] -translate-y-1/2 left-10">
        {handler?.id}
      </div>
      <HeaderBox>
        <ActionList>
          {actionList.map((value) => (
            <ActionItem onClick={value.onClick} key={useId()}>
              {value.name}
            </ActionItem>
          ))}
        </ActionList>
      </HeaderBox>

      {targetEl && (
        <CancelIcon
          onClick={handleDelete}
          className="absolute cursor-pointer top-[50%] -translate-y-1/2 right-10 text-red-600 w-6 h-6"
        />
      )}
    </HeaderContainer>
  );
};

export default Header;
