import { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import Input from '../Input';

import { IChildrenProp } from '@/types/common';

import { cloneMap, objectToMap } from '@/assets/utils/map';
import PlusIcon from '@/icons/Plus';

const MultiInputContainer = styled.div`
  ${tw``}
`;

const Label = styled.span`
  ${tw`block mb-2 text-sm font-medium text-gray-900`}
`;

const Box = styled.div`
  ${tw`space-y-2`}
`;

interface IMultiInput {
  name: string;
  title: string;
  values: string[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: string[]) => void;
}

const MultiInput: React.FC<IChildrenProp & IMultiInput> = ({
  name,
  title,
  values,
  onChange
}) => {
  const [id, setId] = useState(String(values.length));
  const [data, setData] = useState(objectToMap(values));

  useEffect(() => {
    onChange && onChange(Array.from(data.values()));
  }, [data]);

  const handleSetData = (id: string, val: string) => {
    data.set(id, val);
    setData(cloneMap(data));
  };

  const addValue = (id: string, val: string = '') => {
    const clone = cloneMap(data);
    const keys = Array.from(data.keys()).filter(
      (value) => Number(value) >= Number(id)
    );

    keys.forEach((key) => {
      clone.set(String(Number(key) + 1), data.get(key));
    });

    clone.set(id, '');

    setData(cloneMap(clone));
  };

  const removeValue = (id: number) => {
    data.delete(id);
    setData(data);
  };

  const handleChange = (id: string, val: string) => {
    handleSetData(id, val);
  };

  return (
    <MultiInputContainer>
      <Label>{title}</Label>
      <Box>
        {[...data.keys()].map((k) => (
          <div tw="flex items-center gap-2">
            <Input
              name={name + k}
              value={data.get(k) || ''}
              key={k}
              onChange={(value) => {
                handleChange(k, value);
              }}
            />
            <PlusIcon
              onClick={() => {
                addValue(String(Number(k) + 1));
              }}
            />
          </div>
        ))}
      </Box>
    </MultiInputContainer>
  );
};

export default MultiInput;
