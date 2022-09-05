import styled from 'styled-components';

import { genCss } from '@/assets/utils/css';

import { IObjectParagraph } from '@/core/web/types';

interface IParagraph {
  data: IObjectParagraph;
}

const ParagraphContainer = styled.p<{ css: string }>`
  ${({ css }) => css}
`;

const Paragraph: React.FC<IParagraph> = ({
  data: { id, style = {}, title },
  ...rest
}) => {
  return (
    <ParagraphContainer id={id} css={genCss(style)} {...rest}>
      {title}
    </ParagraphContainer>
  );
};

export default Paragraph;
