import DistanceFormula from "./DistanceFormula.class";

class FormulaPerfectScroll extends DistanceFormula {
  start(
    node: HTMLElement,
    initPosition: [number, number],
    event: MouseEvent,
  ): { shiftPosition: [number, number]; originPosition: [number, number] } {
    const rectParent = (
      node.parentElement as HTMLDivElement
    ).getBoundingClientRect();

    const originPosition: [number, number] = [
      (event as any).layerX - event.clientX,
      (event as any).layerY - event.clientY,
    ];

    const shiftPosition: [number, number] = [
      event.clientX - rectParent.x,
      event.clientY - rectParent.y,
    ];

    return {
      originPosition,
      shiftPosition,
    };
  }
  move(
    node: HTMLElement,
    initPosition: [number, number],
    originPosition: [number, number],
    shiftPosition: [number, number],
    event: MouseEvent,
  ): [number, number] {
    const [originX, originY] = originPosition;
    const [shiftX, shiftY] = shiftPosition;

    const x = originX - shiftX + event.pageX;
    const y = originY - shiftY + event.pageY;

    return [x, y];
  }
  end(
    node: HTMLElement,
    initPosition: [number, number],
    originPosition: [number, number],
    shiftPosition: [number, number],
    event: MouseEvent,
  ): [number, number] {
    const [originX, originY] = originPosition;

    const rectParent = (
      node.parentElement as HTMLDivElement
    ).getBoundingClientRect();

    return [originX + rectParent.x, originY + rectParent.y];
  }
}

export default FormulaPerfectScroll;
