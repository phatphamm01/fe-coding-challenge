import styled from 'styled-components';
import tw from 'twin.macro';

import { IChildrenProp } from '@/types/common';

import Input from '@/design/Input';
import Select from '@/design/Select';
import TextInputStyle from '@/design/TextInputStyle';

import { IObjectParagraph } from '@/core/web/types';

import { useHandler } from '@/provider/HandlerProvider';

const ParagraphContainer = styled.div`
  ${tw``}
`;

interface IParagraph {
  value: IObjectParagraph;
}

const Paragraph: React.FC<IChildrenProp & IParagraph> = ({ value }) => {
  const handler = useHandler();
  return (
    <div key={value.id} className="grid gap-6">
      <div className="grid gap-6 grid-cols-2">
        <TextInputStyle
          title="Title"
          name="title"
          value={value.title}
          onChange={(val) => {
            handler?.modifyObject(value, { key: 'title', value: val });
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
      <div className="grid gap-6">
        <Input
          title="Link"
          name="link"
          value={value.link || ''}
          onChange={(val) => {
            handler?.modifyObject(value, { key: 'link', value: val });
          }}
        />
      </div>
    </div>
  );
};

export default Paragraph;
