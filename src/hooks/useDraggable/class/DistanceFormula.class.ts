abstract class DistanceFormula {
  public init(node: HTMLElement): [number, number] {
    return [0, 0];
  }
  abstract start(
    node: HTMLElement,
    initPosition: [number, number],
    event: MouseEvent,
  ): {
    shiftPosition: [number, number];
    originPosition: [number, number];
  };
  abstract move(
    node: HTMLElement,
    initPosition: [number, number],
    originPosition: [number, number],
    shiftPosition: [number, number],
    event: MouseEvent,
  ): [number, number];
  abstract end(
    node: HTMLElement,
    initPosition: [number, number],
    originPosition: [number, number],
    shiftPosition: [number, number],
    event: MouseEvent,
  ): [number, number];
}

export class DistanceFormulaInit extends DistanceFormula {
  start(
    node: HTMLElement,
    initPosition: [number, number],
    event: MouseEvent,
  ): { shiftPosition: [number, number]; originPosition: [number, number] } {
    throw new Error("Method not implemented.");
  }
  move(
    node: HTMLElement,
    initPosition: [number, number],
    originPosition: [number, number],
    shiftPosition: [number, number],
    event: MouseEvent,
  ): [number, number] {
    throw new Error("Method not implemented.");
  }
  end(
    node: HTMLElement,
    initPosition: [number, number],
    originPosition: [number, number],
    shiftPosition: [number, number],
    event: MouseEvent,
  ): [number, number] {
    throw new Error("Method not implemented.");
  }
}

export default DistanceFormula;
