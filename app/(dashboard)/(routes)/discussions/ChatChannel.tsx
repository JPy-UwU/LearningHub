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
  hideChannelOnThread: boolean;
}

export default function ChatChannel({ show, hideChannelOnThread }: ChatChannelProps) {
  return (
    <div className={`h-full w-full ${show ? "block" : "hidden"}`}>
      <Channel>
        <Window hideOnThread={hideChannelOnThread}>
          <ChannelHeader />
          
          <input 
              type="search" 
              placeholder="Search Messages"
              className="rounded-full border border-gray-300 px-4 py-2"
              
              />
              <br></br>
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </div>
  );
}
