import { IOptions } from "../draggable.type";
import DistanceFormula, { DistanceFormulaInit } from "./DistanceFormula.class";

import { clamp, getNearestScale } from "~/common/utils/design/draggable";

class Draggable {
  private target?: HTMLElement;
  private distanceFormula: DistanceFormula = new DistanceFormulaInit();
  private prevPosition: [number, number] = [0, 0];
  private originPosition: [number, number] = [0, 0];
  private initPosition: [number, number] = [0, 0];
  private shiftPosition: [number, number] = [0, 0];
  private dragging: boolean = false;
  private timeOutRef?: NodeJS.Timeout;
  private opts: IOptions;

  constructor(target: HTMLElement, options?: IOptions) {
    this.opts = {
      ...options,
    };

    this.target = target;

    target.ondragstart = function () {
      return false;
    };

    this.init = this.init.bind(this);
    this.destroy = this.destroy.bind(this);
    this.setTransform = this.setTransform.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
  }

  public init(distanceFormula: DistanceFormula) {
    this.distanceFormula = distanceFormula;
    if (!this.target) return;
    if (!this.opts.mouse) return;

    const [initX, initY] = this.distanceFormula.init(this.target);
    this.initPosition = [initX, initY];
    this.prevPosition = [initX, initY];

    this.target.addEventListener("mousedown", this.handleStart);
  }

  public destroy() {
    if (!this.target) return;
    if (!this.opts.mouse) return;

    this.target.removeEventListener("mousedown", this.handleStart);
  }

  protected setTransform(position: [number, number], transition?: string) {
    this.prevPosition = position;
    if (!this.target) return;
    let target = this.target;

    if (this.opts.setCSS) {
      if (transition) {
        target.style.transition = transition;
      } else {
        target.style.transition = "";
      }
      target.style.transform = `translate3d(${position[0]}px, ${position[1]}px, 0)`;
    }
  }

  protected handleStart(e: MouseEvent) {
    if (this.timeOutRef) {
      clearTimeout(this.timeOutRef);
    }
    if (!(e instanceof window.MouseEvent && e.button === 0 && this.opts.mouse))
      return;
    if (!this.target) return;
    const element = this.target;
    let [x, y] = this.prevPosition;

    this.dragging = true;

    // init style
    this.initStyleWhenMove(element);

    // calc shiftPosition
    const { originPosition, shiftPosition } = this.distanceFormula.start(
      element,
      this.initPosition,
      e,
    );

    this.shiftPosition = shiftPosition;
    this.originPosition = originPosition;

    // calc movePosition
    [x, y] = this.distanceFormula.move(
      element,
      this.initPosition,
      this.originPosition,
      this.shiftPosition,
      e,
    );

    this.setTransform([x, y]);

    // handle event start
    this.opts.onStart?.(e, element, this.setTransform);

    // add event move and end
    document.addEventListener("mousemove", this.handleMove);
    document.addEventListener("mouseup", this.handleEnd);
  }

  protected handleMove(e: MouseEvent) {
    if (!this.dragging) return;
    if (this.opts.prevent) {
      e.preventDefault();
    }
    if (!(e instanceof window.MouseEvent && e.button === 0 && this.opts.mouse))
      return;

    if (!this.target) return;
    const element = this.target;
    let [x, y] = this.prevPosition;

    // calc movePosition
    [x, y] = this.distanceFormula.move(
      element,
      this.initPosition,
      this.originPosition,
      this.shiftPosition,
      e,
    );

    ({ x, y } = this.handleStepSize(x, y));
    ({ x, y } = this.handleDirection(x, y));

    // setTransform
    this.setTransform([x, y]);

    // handle event move
    this.opts.onMove?.(e, element, this.setTransform);

    // handle event target
    let elemBelow = document.elementFromPoint(e.pageX, e.pageY);
    this.opts.onTarget?.(e, element, elemBelow);
  }

  handleEnd(e: MouseEvent) {
    if (!(e instanceof window.MouseEvent && e.button === 0 && this.opts.mouse))
      return;

    if (!this.target) return;
    const element = this.target;

    // calc endPosition
    let [x, y] = this.distanceFormula.end(
      element,
      this.initPosition,
      this.originPosition,
      this.shiftPosition,
      e,
    );

    this.dragging = false;

    //handle event end
    this.opts.onEnd?.(e, element, [x, y], this.setTransform);

    // handle event dropAtElement
    let elemBelow = document.elementFromPoint(e.pageX, e.pageY);
    this.opts.onDropAtElement?.(e, element, elemBelow);

    // handle event delay end
    if (this.timeOutRef) {
      clearTimeout(this.timeOutRef);
      this.timeOutRef = undefined;
    }

    this.timeOutRef = setTimeout(() => {
      this.opts.onDelayEnd?.(e, element, this.prevPosition, this.setTransform);
    }, this.opts.delay ?? 150);

    // remove event move and end
    document.removeEventListener("mousemove", this.handleMove);
    document.removeEventListener("mouseup", this.handleEnd);
  }

  private initStyleWhenMove(element: HTMLElement) {
    element.style.height = element.offsetHeight + "px";
    element.style.width = element.offsetWidth + "px";
    element.style.position = "fixed";
    element.style.zIndex = "99999";
    element.style.pointerEvents = "none";
  }

  private handleDirection(x: number, y: number) {
    x =
      this.opts.direction === "vertical"
        ? 0
        : clamp(x, [
            this.opts.maxDistance?.x?.min ?? -Infinity,
            this.opts.maxDistance?.x?.max ?? Infinity,
          ]);
    y =
      this.opts.direction === "horizontal"
        ? 0
        : clamp(y, [
            this.opts.maxDistance?.y?.min ?? -Infinity,
            this.opts.maxDistance?.y?.max ?? Infinity,
          ]);
    return { x, y };
  }

  private handleStepSize(x: number, y: number) {
    if (this.opts.stepSize) {
      x = getNearestScale(
        x,
        typeof this.opts.stepSize === "object"
          ? this.opts.stepSize.x
          : this.opts.stepSize,
      );
      y = getNearestScale(
        y,
        typeof this.opts.stepSize === "object"
          ? this.opts.stepSize.y
          : this.opts.stepSize,
      );
    }
    return { x, y };
  }
}

export default Draggable;
