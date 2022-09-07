import styled from 'styled-components';

import { ITypeCss, genCss } from '@/assets/utils/css';

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
  const styleTitle: ITypeCss = {
    fontWeight: {
      default: title.isBold ? 'bold' : ''
    },
    fontStyle: {
      default: title.isItalic ? 'italic' : ''
    },
    textDecoration: {
      default: title.isUnderlined ? 'underline' : ''
    }
  };
  return (
    <ParagraphContainer
      id={id}
      css={genCss({ ...style, ...styleTitle })}
      {...rest}
    >
      {title.content}
    </ParagraphContainer>
  );
};

export default Paragraph;
