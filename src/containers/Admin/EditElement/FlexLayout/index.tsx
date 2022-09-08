import styled from 'styled-components';
import tw from 'twin.macro';

import { IChildrenProp } from '@/types/common';

import Input from '@/design/Input';
import Select from '@/design/Select';

import { Property } from '@/core/web/constants/css';
import { IObjectFlexLayout } from '@/core/web/types';

import { useHandler } from '@/provider/HandlerProvider';

const FlexLayoutContainer = styled.div`
  ${tw``}
`;

interface IFlexLayout {
  value: IObjectFlexLayout;
}

const FlexLayout: React.FC<IChildrenProp & IFlexLayout> = ({ value }) => {
  const handler = useHandler();

  return (
    <FlexLayoutContainer>
      <div className="grid gap-2 mb-6">
        <div className="grid gap-6 grid-cols-2">
          <Input
            title="Height"
            name="height"
            value={value.height || ''}
            onChange={(val) => {
              handler?.modifyObject(value, { key: 'height', value: val });
            }}
          />
          <Input
            title="Width"
            name="width"
            value={value.width || ''}
            onChange={(val) => {
              handler?.modifyObject(value, { key: 'width', value: val });
            }}
          />
          <div />
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
          <div />
        </div>
        <div className="grid gap-6 grid-cols-3">
          <Select
            title="Flex Direction"
            data={Property.FlexDirection.map((value) => ({
              title: value,
              value: value
            }))}
            name="flexDirection"
            value={{ title: value.flexDirection, value: value.flexDirection }}
            onChange={(val) => {
              handler?.modifyObject(value, {
                key: 'flexDirection',
                value: val.value
              });
            }}
          />
          <Select
            title="Justify Content"
            data={Property.JustifyContent.map((value) => ({
              title: value,
              value: value
            }))}
            name="justifyContent"
            value={{
              title: value.justifyContent,
              value: value.justifyContent
            }}
            onChange={(val) => {
              handler?.modifyObject(value, {
                key: 'justifyContent',
                value: val.value
              });
            }}
          />
          <Select
            title="Align Items"
            data={Property.AlignItems.map((value) => ({
              title: value,
              value: value
            }))}
            name="alignItems"
            value={{ title: value.alignItems, value: value.alignItems }}
            onChange={(val) => {
              handler?.modifyObject(value, {
                key: 'alignItems',
                value: val.value
              });
            }}
          />
        </div>
      </div>
    </FlexLayoutContainer>
  );
};

export default FlexLayout;
