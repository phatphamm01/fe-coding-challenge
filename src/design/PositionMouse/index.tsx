import { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { IChildrenProp } from '@/types/common';

const PositionContainer = styled.div`
  ${tw``}
`;

const PositionMouse: React.FC<IChildrenProp> = () => {
  const [position, setPosition] = useState<number[]>([0, 0]);

  useEffect(() => {
    const handleChangePosition = function (e: MouseEvent) {
      const x = e.clientX;
      const y = e.clientY;

      setPosition([x, y]);
    };

    document.addEventListener('mousemove', handleChangePosition);
    return () => {
      document.removeEventListener('mousemove', handleChangePosition);
    };
  }, []);

  return (
    <PositionContainer>
      <b>Mouse:</b> {`(${position[0]},${position[1]})`}
    </PositionContainer>
  );
};

export default PositionMouse;
