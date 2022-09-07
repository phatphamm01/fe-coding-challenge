import styled from 'styled-components';
import tw from 'twin.macro';

import { IChildrenProp } from '@/types/common';

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
    <div key={value.id} className="grid gap-6 mb-6 grid-cols-2">
      <TextInputStyle
        title="Title"
        name="title"
        value={value.title}
        onChange={(val) => {
          handler?.modifyObject(value, { key: 'title', value: val });
        }}
      />
    </div>
  );
};

export default Paragraph;
