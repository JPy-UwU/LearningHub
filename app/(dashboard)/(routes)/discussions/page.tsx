"use client";
import { StreamChat } from "stream-chat";
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
import useInitializeChatClient from "./useInitializeChatClient";
import { useUser } from "@clerk/nextjs";

const DiscussionsPage = () => {
  const chatClient = useInitializeChatClient();
  const { user } = useUser();

  if (!chatClient || !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingIndicator size={40} />
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Chat client={chatClient}>
        <div className="flex flex-row h-[850px]">
          <div className="w-full max-w-[300px]">
        <ChannelList
          filters={{
            type: "messaging",
            members: { $in: [user.id] },
          }}
          sort={{ last_message_at: -1 }}
          options={{ state: true, presence: true, limit: 10 }}
        />
        </div>
        <div className="h-full w-full">
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
        </div>
        </div>
      </Chat>
    </div>
  );
};

export default DiscussionsPage;
