import styled from 'styled-components';
import tw from 'twin.macro';

import { IChildrenProp } from '@/types/common';

import { useDraggingHandler } from '@/provider/DraggingProvider';

const DraggingContainer = styled.div`
  ${tw``}
`;

const Dragging: React.FC<IChildrenProp> = () => {
  const draggingHandler = useDraggingHandler();
  return (
    <DraggingContainer>
      <b>Dragging:</b> {draggingHandler.state.name}
    </DraggingContainer>
  );
};

export default Dragging;
