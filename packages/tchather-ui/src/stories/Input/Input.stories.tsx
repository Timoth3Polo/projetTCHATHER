import React from 'react';
import { Story, Meta } from '@storybook/react';

import { IInputProps, Input } from './Input';
import { FiSearch } from "react-icons/fi";

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<IInputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithIcon = Template.bind({});
WithIcon.args = {
  searchIcon: true
};

