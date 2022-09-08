import { IChildrenProp } from '@/types/common';

import Input from '@/design/Input';
import MultiInput from '@/design/MultiInput';
import Select from '@/design/Select';
import TextInputStyle from '@/design/TextInputStyle';

import { Property } from '@/core/web/constants/css';
import { IObjectList } from '@/core/web/types';

import { useHandler } from '@/provider/HandlerProvider';

interface IList {
  value: IObjectList;
}

const List: React.FC<IChildrenProp & IList> = ({ value }) => {
  const handler = useHandler();

  return (
    <div className="grid gap-6">
      <div key={value.id} className="grid gap-6 grid-cols-2">
        <div className="flex gap-2 items-end">
          <TextInputStyle
            title="Title"
            name="title"
            value={value.title}
            onChange={(val) => {
              handler?.modifyObject(value, { key: 'title', value: val });
            }}
          />
        </div>

        <Select
          title="List Style"
          data={Property.ListStyle.map((value) => ({
            title: value,
            value: value
          }))}
          name="listStyle"
          value={{ title: value.listStyle, value: value.listStyle }}
          onChange={(val) => {
            handler?.modifyObject(value, {
              key: 'listStyle',
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
      <MultiInput
        title="List"
        name="data"
        values={value.data}
        onChange={(val) => {
          handler?.modifyObject(value, { key: 'data', value: val });
        }}
      />
    </div>
  );
};

export default List;
