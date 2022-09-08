import WebBuilderObject from '../objects';
import { IObjectWebBuilder } from '../types';
import { Handler } from './Handler';

export class UtilsHandler {
  handler: Handler;
  constructor(handler: Handler) {
    this.handler = handler;
  }

  renderElement = (
    data: IObjectWebBuilder[],
    type: 'main' | 'layout' = 'main'
  ) => {
    return data.map((value) => {
      const Comp = WebBuilderObject[value.type].create({
        data: value
      });

      if (type === 'main' && value.root) {
        return;
      }

      return (
        <Comp
          style={{
            outline:
              this.handler.target?.id === value.id ? '1px solid blue' : ''
          }}
          onClick={(event) => {
            event.stopPropagation();
            // (event as any).cancelBubble = true;

            this.handler?.onSelected?.(value);
          }}
          key={value.id}
          data={value}
        />
      );
    });
  };
}
