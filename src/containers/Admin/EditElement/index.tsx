import { IChildrenProp } from 'src/types/common';
import styled from 'styled-components';
import tw from 'twin.macro';

const EditElementContainer = styled.div`
  ${tw`h-[20vh] w-full`}
`;

const EditElement: React.FC<IChildrenProp> = () => {
  return <EditElementContainer>EditElement</EditElementContainer>;
};

export default EditElement;
