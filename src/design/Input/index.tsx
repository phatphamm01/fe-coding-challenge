import { ChangeEvent, HTMLInputTypeAttribute, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { IChildrenProp } from '@/types/common';

const InputContainer = styled.div`
  ${tw``}
`;

const Label = styled.label`
  ${tw`block mb-2 text-sm font-medium text-gray-900`}
`;

const InputEl = styled.input`
  ${tw`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full p-2.5`}
`;

interface IInput {
  name: string;
  title: string;
  value: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

const Input: React.FC<IChildrenProp & IInput> = ({
  name,
  title,
  value,
  type = 'text',
  placeholder,
  required,
  disabled,
  onChange
}) => {
  const [val, setValue] = useState(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setValue(value);
    onChange && onChange(value);
  };

  return (
    <InputContainer>
      <Label htmlFor={name}>{title}</Label>
      <InputEl
        type={type}
        id={name}
        value={val}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={handleChange}
      />
    </InputContainer>
  );
};

export default Input;
