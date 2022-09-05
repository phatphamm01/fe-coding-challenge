import styled from 'styled-components';

import { genCss } from '@/assets/utils/css';

import { IObjectButton } from '@/core/web/types';

interface IButton {
  data: IObjectButton;
}

const ButtonContainer = styled.button<{ css: string }>`
  ${({ css }) => css}
`;

const Button: React.FC<IButton> = ({
  data: { id, style = {}, title, type },
  ...rest
}) => {
  return (
    <ButtonContainer id={id} css={genCss(style)} {...rest}>
      {title}
    </ButtonContainer>
  );
};

export default Button;
