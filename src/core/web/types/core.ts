import { ITypeCss } from '@/assets/utils/css';

export type ITypeWebBuilder =
  | 'button'
  | 'paragraph'
  | 'image'
  | 'list'
  | 'flexLayout';

export interface IObjectWebBuilder {
  id: string;
  type: ITypeWebBuilder;
  zIndex?: string;

  margin: string;
  padding: string;

  style?: ITypeCss;

  root?: string;

  [key: string]: any;
}

export interface KeyEvent {
  /**
   * Arrow key
   * @type {boolean}
   */
  move?: boolean;
  /**
   * Ctrl + A
   * @type {boolean}
   */
  all?: boolean;
  /**
   * Ctrl + C
   * @type {boolean}
   */
  copy?: boolean;
  /**
   * Ctrl + P
   * @type {boolean}
   */
  paste?: boolean;
  /**
   * Escape
   * @type {boolean}
   */
  esc?: boolean;
  /**
   * Delete or Backspace
   * @type {boolean}
   */
  del?: boolean;
  /**
   * When have copied object, whether should copy object option on clipboard
   * @type {boolean}
   */
  clipboard?: boolean;
  /**
   * Ctrl + Z, Ctrl + Y
   * @type {boolean}
   */
  transaction?: boolean;
  /**
   * Plus, Minus
   *
   * @type {boolean}
   */
  zoom?: boolean;
  /**
   * Ctrl + X
   *
   * @type {boolean}
   */
  cut?: boolean;
  grab?: boolean;
}
