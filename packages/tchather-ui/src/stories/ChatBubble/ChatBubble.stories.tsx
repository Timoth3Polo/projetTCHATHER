import React from 'react';
import { Story, Meta } from '@storybook/react';

import { IChatBubbleProps, ChatBubble } from './ChatBubble';


export default {
  title: 'Components/ChatBubble',
  component: ChatBubble,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<IChatBubbleProps> = (args) => <ChatBubble {...args} />;

export const CurrentUser = Template.bind({});
CurrentUser.args = {
  isCurrentUserMessage: true
};

export const OtherUser = Template.bind({});
OtherUser.args = {
  isCurrentUserMessage: false
};


