import styled from 'styled-components';
import tw from 'twin.macro';

import { IChildrenProp } from '@/types/common';

const EditElementContainer = styled.div`
  ${tw`h-[30vh]`}
`;

const EditElement: React.FC<IChildrenProp> = () => {
  return <EditElementContainer>EditElement</EditElementContainer>;
};

export default EditElement;
