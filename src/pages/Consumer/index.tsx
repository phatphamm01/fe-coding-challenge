import { IChildrenProp } from 'src/types/common';
import styled from 'styled-components';
import tw from 'twin.macro';

const ConsumerContainer = styled.div`
  ${tw``}
`;

const Consumer: React.FC<IChildrenProp> = () => {
  return <ConsumerContainer>Consumer</ConsumerContainer>;
};

export default Consumer;
