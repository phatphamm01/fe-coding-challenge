import WebBuilderObject from '../objects';
import { IObjectWebBuilder } from '../types';
import { Handler } from './Handler';

export class UtilsHandler {
  handler: Handler;
  constructor(handler: Handler) {
    this.handler = handler;
  }

  renderElementByMain = (
    data: IObjectWebBuilder[],
    type: 'main' | 'flexLayout' = 'main'
  ) => {
    return data.map((value) => {
      if (type === 'main' && value.root) {
        return;
      }
      const Comp = WebBuilderObject[value.type].create({
        data: value
      });

      return (
        <Comp
          style={{
            outline:
              this.handler.target?.id === value.id ? '1px solid blue' : ''
          }}
          onClick={(event) => {
            if (this.handler.editable) {
              event.stopPropagation();
              // (event as any).cancelBubble = true;

              this.handler?.onSelected?.(value);
            }
          }}
          key={value.id}
          data={value}
        />
      );
    });
  };

  renderElementByLayout = (data: IObjectWebBuilder[]) => {
    return data.map((value) => {
      const Comp = WebBuilderObject[value.type].create({
        data: value
      });

      return (
        <Comp
          style={{
            outline:
              this.handler.target?.id === value.id ? '1px solid blue' : ''
          }}
          onClick={(event) => {
            if (this.handler.editable) {
              event.stopPropagation();
              // (event as any).cancelBubble = true;

              this.handler?.onSelected?.(value);
            }
          }}
          key={value.id}
          data={value}
        />
      );
    });
  };
}
