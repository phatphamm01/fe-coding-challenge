import { IChildrenProp } from '@/types/common';

import Input from '@/design/Input';
import Select from '@/design/Select';

import { Property } from '@/core/web/constants/css';
import { IObjectImage } from '@/core/web/types';

import { useHandler } from '@/provider/HandlerProvider';

interface IImage {
  value: IObjectImage;
}

const Image: React.FC<IChildrenProp & IImage> = ({ value }) => {
  const handler = useHandler();

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 grid-cols-2">
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
      <div className="grid gap-6 mb-6 grid-cols-3">
        <Input
          title="Height"
          name="height"
          value={value.height}
          onChange={(val) => {
            handler?.modifyObject(value, { key: 'height', value: val });
          }}
        />
        <Input
          title="Width"
          name="width"
          value={value.width}
          onChange={(val) => {
            handler?.modifyObject(value, { key: 'width', value: val });
          }}
        />
        <Select
          title="Object Fit"
          data={Property.ObjectFit.map((value) => ({
            title: value,
            value: value
          }))}
          name="objectFit"
          value={{ title: value.objectFit, value: value.objectFit }}
          onChange={(val) => {
            handler?.modifyObject(value, {
              key: 'objectFit',
              value: val.value
            });
          }}
        />
      </div>
    </div>
  );
};

export default Image;
