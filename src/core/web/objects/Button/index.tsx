import styled from 'styled-components';

import { genCss } from '@/assets/utils/css';

import { IObjectButton } from '@/core/web/types';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  data: IObjectButton;
}

const ButtonContainer = styled.button<{ css: string }>`
  ${({ css }) => css}
`;

const Button: React.FC<IButton> = ({
  data: { id, style = {}, title, type, alert: message },
  onClick,
  ...rest
}) => {
  return (
    <ButtonContainer
      id={id}
      css={genCss(style)}
      {...(rest as any)}
      onClick={(e) => {
        if (onClick) {
          onClick && onClick(e);
        } else {
          alert(message);
        }
      }}
    >
      {title}
    </ButtonContainer>
  );
};

export default Button;
