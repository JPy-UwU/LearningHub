import React from "react";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

interface ChatChannelProps {
  show: boolean;
}

export default function ChatChannel({ show }: ChatChannelProps) {
  return (
    <div className={`h-full w-full ${show ? "block" : "hidden"}`}>
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </div>
  );
}
