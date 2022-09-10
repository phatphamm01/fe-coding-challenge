import styled from 'styled-components';
import tw from 'twin.macro';

import { ITypeCss, genCss } from '@/assets/utils/css';

import useRandomColor from '@/hooks/useRandomColor';

import { IObjectFlexLayout, IObjectWebBuilder } from '@/core/web/types';

import { useHandler } from '@/provider/HandlerProvider';

const LayoutContainer = styled.div<{ css: string }>`
  ${tw`flex`}
  ${({ css }) => css}
`;

interface ILayout {
  data: IObjectFlexLayout;
}

const Layout: React.FC<ILayout> = ({
  data: {
    id,
    children,
    alignItems,
    flexDirection: direction,
    justifyContent,
    height,
    width,
    margin,
    padding,
    gap,
    background,
    boxShadow,
    borderRadius
  },
  ...rest
}) => {
  const handler = useHandler();

  const color = useRandomColor();

  const stylesLayout: ITypeCss = {
    alignItems: {
      default: alignItems
    },
    flexDirection: {
      default: direction
    },
    justifyContent: {
      default: justifyContent
    },
    height: {
      default: height
    },
    width: {
      default: width
    },
    padding: {
      default: padding
    },
    margin: {
      default: margin
    },
    gap: {
      default: gap
    },
    borderRadius: {
      default: borderRadius
    },
    boxShadow: {
      default: boxShadow
    },
    backgroundColor: {
      default: handler?.editable
        ? `rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`
        : ''
    },
    background: { default: background }
  };

  const childrenObject =
    (children
      ?.map((id) => handler?.getMapObjects().get(id))
      ?.filter((value) => value) as IObjectWebBuilder[]) || [];

  return (
    <LayoutContainer
      id={id}
      data-type="flexLayout"
      css={genCss({ ...stylesLayout })}
      {...rest}
    >
      {handler?.utilsHandler.renderElementByLayout(childrenObject)}
    </LayoutContainer>
  );
};

export default Layout;
