import React from "react";
import ChatBubbleStyle from "./ChatBubble.module.css";
export interface IChatBubbleProps {
  value: string;
  isCurrentUserMessage: boolean;
}

export const ChatBubble: React.FC<IChatBubbleProps> = ({
  value,
  isCurrentUserMessage,
}) => {
  return (
    <div
      className={`${ChatBubbleStyle.UserMessage} ${
        isCurrentUserMessage
          ? ChatBubbleStyle.CurrentUser
          : ChatBubbleStyle.OtherUser
      }`}
    >
      <p>{value}</p>
    </div>
  );
};
