export interface IStyle {
  isBold?: boolean;
  isItalic?: boolean;
  isUnderlined?: boolean;
}
export type IString = {
  content: string;
  font?: string;
} & IStyle;
