import { DependencyList } from "react";

export interface IOptions {
  /** use Event.preventDefault with the touchmove events */
  prevent?: boolean;
  /** listen touch events */
  touch?: boolean;
  /** listen mouse events */
  mouse?: boolean;
  /** dragging direction */
  direction?: "vertical" | "horizontal" | "both";
  /** set css transform */
  setCSS?: boolean;
  /** max dragging distance */
  maxDistance?: {
    x?: { max?: number; min?: number };
    y?: { max?: number; min?: number };
  };
  /** position step size */
  stepSize?:
    | number
    | {
        x: number;
        y: number;
      };
  delay?: number;
  /** start callback */
  onStart?: (
    event: MouseEvent,
    target: HTMLElement,
    setPosition: (position: [number, number], transition?: string) => void,
  ) => void;
  /** move callback */
  onMove?: (
    event: MouseEvent,
    target: HTMLElement,
    setPosition: (position: [number, number], transition?: string) => void,
  ) => void;
  /** end callback */
  onEnd?: (
    event: MouseEvent,
    target: HTMLElement,
    positionInit: [number, number],
    setPosition: (position: [number, number], transition?: string) => void,
  ) => void;
  onDelayEnd?: (
    event: MouseEvent,
    target: HTMLElement,
    positionInit: [number, number],
    setPosition: (position: [number, number], transition?: string) => void,
  ) => void;
  onTarget?: (
    event: MouseEvent,
    target: HTMLElement,
    element: Element | null,
  ) => void;
  onDropAtElement?: (
    event: MouseEvent,
    target: HTMLElement,
    element: Element | null,
  ) => void;
}

export type TUseDraggable = <T extends HTMLElement>(
  options?: IOptions,
  dependencyList?: DependencyList,
) => {
  target: React.RefObject<T>;
};
