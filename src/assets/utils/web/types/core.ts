import { CSSProperties } from 'react';

export type ITypeWebBuilder = 'button' | 'paragraph';

export interface IObjectWebBuilder {
  id: string;
  type: ITypeWebBuilder;
  zIndex: string;

  style: CSSProperties;
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
