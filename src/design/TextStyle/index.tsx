import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { IChildrenProp } from '@/types/common';

import BoldIcon from '@/icons/Bold';
import ItalicIcon from '@/icons/Italic';
import UnderlineIcon from '@/icons/Underline';

import { IStyle } from '@/core/web/types';

const TextStyleContainer = styled.div`
  ${tw`flex gap-2`}
`;

const BoxIcon = styled.label`
  ${tw`shadow p-1 rounded border border-gray-300 `}
`;

interface ITextStyle {
  value: IStyle;
  onChange?: (value: IStyle) => void;
}

const COLOR_SELECTED = '#999999';

const TextStyle: React.FC<IChildrenProp & ITextStyle> = ({
  value: valueDefault,
  onChange
}) => {
  const [value, setValue] = useState<IStyle>(valueDefault);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    const el = e.target;

    const id = el.id;
    const checked = el.checked;

    const newValue = {
      ...value,
      [id]: checked
    };

    setValue(newValue);
    onChange && onChange(newValue);
  };

  return (
    <TextStyleContainer>
      <BoxIcon
        style={{
          backgroundColor: (value?.isBold && COLOR_SELECTED) || '',
          color: (value?.isBold && '#fff') || ''
        }}
        htmlFor="isBold"
      >
        <input
          type="checkbox"
          id="isBold"
          checked={value?.isBold}
          onChange={handleChange}
          hidden
        />
        <BoldIcon />
      </BoxIcon>
      <BoxIcon
        style={{
          backgroundColor: (value?.isItalic && COLOR_SELECTED) || '',
          color: (value?.isItalic && '#fff') || ''
        }}
        htmlFor="isItalic"
      >
        <input
          type="checkbox"
          id="isItalic"
          checked={value?.isItalic}
          onChange={handleChange}
          hidden
        />
        <ItalicIcon />
      </BoxIcon>
      <BoxIcon
        style={{
          backgroundColor: (value?.isUnderlined && COLOR_SELECTED) || '',
          color: (value?.isUnderlined && '#fff') || ''
        }}
        htmlFor="isUnderlined"
      >
        <input
          type="checkbox"
          id="isUnderlined"
          checked={value?.isUnderlined}
          onChange={handleChange}
          hidden
        />
        <UnderlineIcon />
      </BoxIcon>
    </TextStyleContainer>
  );
};

export default TextStyle;
