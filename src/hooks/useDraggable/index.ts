import { useEffect, useMemo, useRef } from 'react';

import Draggable from './class/Draggable.class';
import FormulaDefaultScroll from './class/FormulaDefaultScroll.class';
import { IOptions, TUseDraggable } from './draggable.type';

const defaultOptions = {
  prevent: true,
  touch: true,
  mouse: true,
  direction: 'both',
  maxDistance: {
    x: { max: Infinity, min: -Infinity },
    y: { max: Infinity, min: -Infinity }
  },
  stepSize: 0,
  delay: 150,
  setCSS: true,
  onStart: function () {},
  onMove: function () {},
  onEnd: function () {},
  onDelayEnd: function () {},
  onTarget: function () {},
  onDropAtElement: function () {}
} as const;

const useDraggable: TUseDraggable = <T extends HTMLElement>(
  options?: IOptions,
  dependencyList?: any
) => {
  const opts = useMemo(() => {
    return {
      ...defaultOptions,
      ...options
    };
  }, [options, dependencyList]);

  const target = useRef<T>(null);
  const draggable = useRef<Draggable>();

  useEffect(() => {
    const node = target.current;
    if (node) {
      draggable.current = new Draggable(node, opts);
      draggable.current.init(new FormulaDefaultScroll());
    }

    return () => {
      if (node && draggable.current) {
        draggable.current.destroy();
      }
    };
  }, [target, opts]);

  return { target };
};

export default useDraggable;
