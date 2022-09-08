import styled from 'styled-components';
import tw from 'twin.macro';

import { ITypeCss, genCss } from '@/assets/utils/css';

import { IObjectImage } from '@/core/web/types';

interface IImage {
  data: IObjectImage;
}

const ImageBox = styled.div<{ css: string }>`
  ${({ css }) => css}
`;

const ImageEl = styled.img<{ css: string }>`
  ${tw`block h-full w-full`}
  ${({ css }) => css}
`;

const Image: React.FC<IImage> = ({
  data: {
    id,
    style = {},
    src,
    name,
    height,
    width,
    objectFit,
    margin,
    padding
  },
  ...rest
}) => {
  const cssBox: ITypeCss = {
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
    }
  };

  return (
    <ImageBox css={genCss(cssBox)}>
      <ImageEl
        id={id}
        src={src}
        alt={name}
        css={genCss({ ...style, objectFit: { default: objectFit } })}
        {...rest}
      />
    </ImageBox>
  );
};

export default Image;
