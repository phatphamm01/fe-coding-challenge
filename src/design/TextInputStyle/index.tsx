import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import TextStyle from '../TextStyle';

import { IChildrenProp } from '@/types/common';

import { IString, IStyle } from '@/core/web/types';

const InputContainer = styled.div`
  ${tw`w-full`}
`;

const Label = styled.label`
  ${tw`block mb-2 text-sm font-medium text-gray-900`}
`;

const InputEl = styled.input`
  ${tw`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full p-2.5`}
`;

interface ITextInputStyle {
  name: string;
  title?: string;
  value: IString;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: IString) => void;
}

const TextInputStyle: React.FC<IChildrenProp & ITextInputStyle> = ({
  name,
  value,
  disabled,
  placeholder,
  title,
  required,
  onChange
}) => {
  const [val, setValue] = useState<IString>(value);

  console.log(val);
  useEffect(() => {
    setValue(value);
  }, [value]);

  useEffect(() => {
    onChange && onChange(val);
  }, [val]);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | IStyle) => {
    const changeValue = handleChangeContent(e as any);
    if (changeValue) return;

    handleChangeStyle(e as any);
  };

  const handleChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const target = (e as ChangeEvent<HTMLInputElement>).target;

      const { value } = target;
      setValue({ ...val, content: value });

      return true;
    }

    return false;
  };

  const handleChangeStyle = (value: IStyle) => {
    setValue({ ...val, ...value });
  };

  return (
    <InputContainer>
      {title && <Label htmlFor={name}>{title}</Label>}
      <div className="flex items-center gap-3">
        <InputEl
          type="text"
          id={name}
          value={val.content}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={handleChange}
        />
        <TextStyle
          value={{
            isBold: val.isBold,
            isItalic: val.isItalic,
            isUnderlined: val.isUnderlined
          }}
          onChange={handleChange}
        />
      </div>
    </InputContainer>
  );
};

export default TextInputStyle;
