import styled from 'styled-components';
import tw from 'twin.macro';

import { IChildrenProp } from '@/types/common';

import usePositionMouse from '@/hooks/usePositionMouse';

const PositionContainer = styled.div`
  ${tw``}
`;

const PositionMouse: React.FC<IChildrenProp> = () => {
  const position = usePositionMouse();

  return (
    <PositionContainer>
      <b>Mouse:</b> {`(${position[0]},${position[1]})`}
    </PositionContainer>
  );
};

export default PositionMouse;
