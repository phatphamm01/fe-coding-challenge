import { IChildrenProp } from '@/types/common';

import Input from '@/design/Input';
import Select from '@/design/Select';

import { IObjectButton } from '@/core/web/types';

import { useHandler } from '@/provider/HandlerProvider';

interface IButton {
  value: IObjectButton;
}

const Button: React.FC<IChildrenProp & IButton> = ({ value }) => {
  const handler = useHandler();
  return (
    <div key={value.id} className="grid gap-2 mb-6">
      <div className="grid gap-6 grid-cols-2">
        <Input
          title="Title"
          name="title"
          value={value.title}
          onChange={(val) => {
            handler?.modifyObject(value, { key: 'title', value: val });
          }}
        />
        <Input
          title="Alert"
          name="alert"
          value={value.alert}
          onChange={(val) => {
            handler?.modifyObject(value, { key: 'alert', value: val });
          }}
        />
      </div>
      <div className="grid gap-6 grid-cols-3">
        <Input
          title="Height"
          name="height"
          value={value.height || ''}
          onChange={(val) => {
            handler?.modifyObject(value, { key: 'height', value: val });
          }}
        />
        <Input
          title="Width"
          name="width"
          value={value.width || ''}
          onChange={(val) => {
            handler?.modifyObject(value, { key: 'width', value: val });
          }}
        />
        <Select
          title="Display"
          data={['block', 'inline'].map((value) => ({
            title: value,
            value: value
          }))}
          name="display"
          value={{ title: value.display, value: value.display }}
          onChange={(val) => {
            handler?.modifyObject(value, {
              key: 'display',
              value: val.value
            });
          }}
        />
      </div>
      <div className="grid gap-6 grid-cols-2">
        <Input
          title="Margin"
          name="margin"
          value={value.margin || ''}
          onChange={(val) => {
            handler?.modifyObject(value, { key: 'margin', value: val });
          }}
        />
        <Input
          title="Padding"
          name="padding"
          value={value.padding || ''}
          onChange={(val) => {
            handler?.modifyObject(value, { key: 'padding', value: val });
          }}
        />
      </div>
    </div>
  );
};

export default Button;
