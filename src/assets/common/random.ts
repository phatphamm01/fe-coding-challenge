import { v4 as uuid } from 'uuid';

export const randomId = () => uuid().toString();

export interface IRBG {
  r: number;
  g: number;
  b: number;
}

export const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
};

export const randomHexColor = () =>
  Math.floor(Math.random() * 16777215).toString(16);

export const randomRBGColor = () => hexToRgb(randomHexColor());
