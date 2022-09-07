import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const SelectContainer = styled.div`
  ${tw``}
`;

const Label = styled.label`
  ${tw`block mb-2 text-sm font-medium text-gray-900`}
`;

const SelectEL = styled.select`
  ${tw`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
`;

const Option = styled.option`
  ${tw``}
`;

type IValue = {
  title: string;
  value: string;
} & { [k in string]: any };

interface ISelect<T extends IValue> {
  title: string;
  name: string;
  data: T[];
  value: T;
  placeHolder?: string;
  onChange: (value: T) => void;
}

const Select = <T extends IValue>({
  name,
  title,
  value,
  placeHolder,
  data,
  onChange
}: ISelect<T>) => {
  const [val, setValue] = useState<T>(value);
  console.log({ data });

  useEffect(() => {
    setValue(value);
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const valReal = data.find((item) => item.value === val);

    if (!valReal) return;

    setValue(valReal);
    onChange && onChange(valReal);
  };

  return (
    <SelectContainer>
      <Label htmlFor={name}>{title}</Label>
      <SelectEL onChange={handleChange} value={val.value} id={name}>
        <>
          {data?.map((value: IValue) => (
            <Option key={value.value} value={value.value}>
              {value.title}
            </Option>
          ))}
        </>
      </SelectEL>
    </SelectContainer>
  );
};

export default Select;
