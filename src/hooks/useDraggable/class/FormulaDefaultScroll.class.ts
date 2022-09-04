import DistanceFormula from './DistanceFormula.class';

class FormulaDefaultScroll extends DistanceFormula {
  init(node: HTMLElement): [number, number] {
    const [positionRealX, positionRealY] = this.getPosition(node);

    return [positionRealX, positionRealY];
  }

  start(
    node: HTMLElement,
    initPosition: [number, number],
    event: MouseEvent
  ): { shiftPosition: [number, number]; originPosition: [number, number] } {
    const rectTarget = node.getBoundingClientRect();
    const rectParent = (
      node.parentElement as HTMLDivElement
    ).getBoundingClientRect();

    const [initX, initY] = initPosition;

    const originPosition: [number, number] = [
      -rectTarget.left - (rectParent.x - initX) + initX,
      -rectTarget.top - (rectParent.y - initY) + initY
    ];

    const shiftPosition: [number, number] = [event.clientX, event.clientY];

    return {
      shiftPosition,
      originPosition
    };
  }

  move(
    node: HTMLElement,
    initPosition: [number, number],
    originPosition: [number, number],
    shiftPosition: [number, number],
    event: MouseEvent
  ): [number, number] {
    const [shiftX, shiftY] = shiftPosition;

    const x = event.pageX - shiftX;
    const y = event.pageY - shiftY;
    return [x, y];
  }

  end(
    node: HTMLElement,
    initPosition: [number, number],
    originPosition: [number, number],
    shiftPosition: [number, number],
    event: MouseEvent
  ): [number, number] {
    const rectParent = (
      node.parentElement as HTMLDivElement
    ).getBoundingClientRect();
    const [initX, initY] = initPosition;

    let x = rectParent.x - initX;
    let y = rectParent.y - initY;

    return [x, y];
  }

  getPosition = (elem: any) => {
    var left = 0,
      top = 0;

    if (!elem) return [0, 0];

    do {
      left += elem.offsetLeft - elem.scrollLeft;
      top += elem.offsetTop - elem.scrollTop;
    } while ((elem = elem.offsetParent));

    return [left, top];
  };
}

export default FormulaDefaultScroll;
