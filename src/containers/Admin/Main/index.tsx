import { IChildrenProp } from 'src/types/common';
import styled from 'styled-components';
import tw from 'twin.macro';

const MainContainer = styled.div`
  ${tw`border-b flex-1`}
`;

const Main: React.FC<IChildrenProp> = () => {
  return <MainContainer>Main</MainContainer>;
};

export default Main;
