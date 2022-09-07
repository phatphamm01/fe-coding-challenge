import { IChildrenProp } from '@/types/common';

import Input from '@/design/Input';

import { IObjectButton } from '@/core/web/types';

import { useHandler } from '@/provider/HandlerProvider';

interface IButton {
  value: IObjectButton;
}

const Button: React.FC<IChildrenProp & IButton> = ({ value }) => {
  const handler = useHandler();
  return (
    <div key={value.id} className="grid gap-6 mb-6 grid-cols-2">
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
  );
};

export default Button;
