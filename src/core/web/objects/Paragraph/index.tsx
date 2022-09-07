import styled from 'styled-components';

import { ITypeCss, genCss } from '@/assets/utils/css';

import { IObjectParagraph } from '@/core/web/types';

import { useHandler } from '@/provider/HandlerProvider';

interface IParagraph {
  data: IObjectParagraph;
}

const ParagraphContainer = styled.p<{ css: string }>`
  ${({ css }) => css}
`;

const Paragraph: React.FC<IParagraph> = ({
  data: { id, style = {}, title, display, link },
  ...rest
}) => {
  const handler = useHandler();

  const styleTitle: ITypeCss = {
    fontWeight: {
      default: title.isBold ? 'bold' : ''
    },
    fontStyle: {
      default: title.isItalic ? 'italic' : ''
    },
    textDecoration: {
      default: title.isUnderlined ? 'underline' : ''
    },
    display: {
      default: display
    }
  };
  return (
    <ParagraphContainer
      id={id}
      css={genCss({ ...style, ...styleTitle })}
      {...rest}
    >
      {handler?.editable ? title.content : <a href={link}>{title.content}</a>}
    </ParagraphContainer>
  );
};

export default Paragraph;
