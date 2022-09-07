import { IChildrenProp } from '@/types/common';

import Input from '@/design/Input';

import { IObjectImage } from '@/core/web/types';

import { useHandler } from '@/provider/HandlerProvider';

interface IImage {
  value: IObjectImage;
}

const Image: React.FC<IChildrenProp & IImage> = ({ value }) => {
  const handler = useHandler();

  return (
    <div key={value.id} className="grid gap-6 mb-6 grid-cols-2">
      <Input
        title="Name"
        name="name"
        value={value.name}
        onChange={(val) => {
          handler?.modifyObject(value, { key: 'name', value: val });
        }}
      />
      <Input
        title="Link"
        name="src"
        value={value.src}
        onChange={(val) => {
          handler?.modifyObject(value, { key: 'src', value: val });
        }}
      />
    </div>
  );
};

export default Image;
