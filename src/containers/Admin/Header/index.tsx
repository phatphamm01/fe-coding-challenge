import { useId } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { IChildrenProp } from '@/types/common';

const HeaderContainer = styled.div`
  ${tw`w-full h-14 border-b`}
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
  return (
    <HeaderContainer>
      <HeaderBox>
        <ActionList>
          {actionList.map((value) => (
            <ActionItem key={useId()}>{value.name}</ActionItem>
          ))}
        </ActionList>
      </HeaderBox>
    </HeaderContainer>
  );
};

export default Header;

const actionList = [
  {
    name: 'Save'
  },
  {
    name: 'Undo'
  },
  {
    name: 'Redo'
  },
  {
    name: 'Export'
  },
  {
    name: 'Import'
  },
  {
    name: 'View'
  }
];
