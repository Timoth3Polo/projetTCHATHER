import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button, IButtonProps } from './Button';


export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<IButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: "Button"
};

export const Primary = Template.bind({});
Primary.args = {
    children: "Button",
    type: "primary"
};

export const Secondary = Template.bind({});
Secondary.args = {
    children: "Button",
    type: "secondary"

};

export const Success = Template.bind({});
Success.args = {
    children: "Button",
    type: "success"
};

export const Warning = Template.bind({});
Warning.args = {
    children: "Button",
    type: "warning"
};


