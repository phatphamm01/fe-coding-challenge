import styled from 'styled-components';

import { ITypeCss, genCss } from '@/assets/utils/css';

import { IObjectButton } from '@/core/web/types';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  data: IObjectButton;
}

const ButtonContainer = styled.button<{ css: string }>`
  ${({ css }) => css}
`;

const Button: React.FC<IButton> = ({
  data: {
    id,
    style = {},
    title,
    type,
    alert: message,
    margin,
    padding,
    height,
    width,
    display
  },
  onClick,
  ...rest
}) => {
  const styles: ITypeCss = {
    padding: {
      default: padding
    },
    margin: {
      default: margin
    },
    height: {
      default: height
    },
    width: {
      default: width
    },
    display: { default: display }
  };

  return (
    <ButtonContainer
      id={id}
      css={genCss({ ...style, ...styles })}
      {...(rest as any)}
      onClick={(e) => {
        console.log({ onClick });

        if (onClick) {
          onClick(e);
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
