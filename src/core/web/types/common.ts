export interface IStyle {
  isBold?: boolean;
  isItalic?: boolean;
  isUnderlined?: boolean;
}
export interface IFont {
  fontFamily?: string;
  fontSize: string;
}

export type IString = {
  content: string;
} & IStyle &
  IFont;
