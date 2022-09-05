import { CSSProperties } from 'react';

const screens = {
  phone: '600px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1270px',
  television: '1600px'
};

export type IScreen = keyof typeof screens;

export type IGenCss<T> =
  | {
      [K in IScreen]?: T;
    } & { default: T };

var msPattern = /^ms-/;

var _uppercasePattern = /([A-Z])/g;

const hyphenate = (str: string) => {
  return str.replace(_uppercasePattern, '-$1').toLowerCase();
};

const hyphenateStyleName = (str: string) => {
  return hyphenate(str).replace(msPattern, '-ms-');
};

export type ITypeCss = {
  [key in keyof CSSProperties]?: IGenCss<CSSProperties[key]>;
};

export const genCss = (styles: ITypeCss) => {
  const keys = Object.keys(styles) as (keyof CSSProperties)[];
  const result = keys.map((cssKey) => {
    const breakpoints = styles[cssKey]!;

    const breakpointsKeys = Object.keys(breakpoints) as (keyof IGenCss<any>)[];
    const breakpointsCss = breakpointsKeys.map((breakpointKey) => {
      const css =
        breakpointKey === 'default'
          ? `${hyphenateStyleName(cssKey)}: ${breakpoints[breakpointKey]}`
          : `@media (min-width: ${screens[breakpointKey]}){${hyphenateStyleName(
              cssKey
            )}: ${breakpoints[breakpointKey]}}`;
      return css;
    });

    return breakpointsCss.join(';');
  });

  return result.join(';');
};
