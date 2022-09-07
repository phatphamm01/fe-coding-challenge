import styled from 'styled-components';
import tw from 'twin.macro';

import { ITypeCss, genCss } from '@/assets/utils/css';

import { IObjectList } from '@/core/web/types';

interface IList {
  data: IObjectList;
}

const Title = styled.div<{ css: string }>`
  ${({ css }) => css}
`;

const ListContainer = styled.div<{ css: string }>`
  ${({ css }) => css}
  ${tw``}
`;

const ListEl = styled.ul<{ css: string }>`
  ${({ css }) => css}
`;

const ItemEl = styled.li`
  ${tw``}
`;

const List: React.FC<IList> = ({
  data: { id, style = {}, title, data = [], listStyle },
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

  const styleList: ITypeCss = {
    listStyle: {
      default: listStyle
    }
  };

  console.log(title.content);

  return (
    <ListContainer css={genCss(style)} {...rest}>
      <Title css={genCss(styleTitle)}>{title.content}</Title>
      <ListEl style={{}} id={id} css={genCss(styleList)}>
        {data.map((value) => (
          <ItemEl>{value}</ItemEl>
        ))}
      </ListEl>
    </ListContainer>
  );
};

export default List;
