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
import MenuBar from "./MenuBar";
import SideBar from "./SideBar";
import ChatChannel from "./ChatChannel";
import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import useWindowSize from "@/app/hooks/useWindowSize";
import { mdBreakpoint } from "@/app/utils/tailwind";

const DiscussionsPage = () => {
  const chatClient = useInitializeChatClient();
  const { user } = useUser();

  const [SidebarOpen, setSidebarOpen] = useState(false);

  const windowSize = useWindowSize();
  const isLargeScreen = windowSize.width >= mdBreakpoint;

  useEffect(() => {
    if (windowSize.width >= mdBreakpoint) setSidebarOpen(false);
  }, [windowSize.width]);

  const handleSidebarOnClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  if (!chatClient || !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingIndicator size={40} />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 xl:px-3 xl:py-3">
      <div className="max-w-[1600px] min-w-[350px] h-full shadow-sm m-auto flex flex-col">
        <Chat client={chatClient}>
          <div className="flex justify-center border-b border-b-[#DBDDE1] p-3 md:hidden">
            <button onClick={() => setSidebarOpen(!SidebarOpen)}>
              {!SidebarOpen ? (
                <span className="flex items-center gap-1">
                  <Menu /> Menu
                </span>
              ) : (
                <X />
              )}
            </button>
          </div>
          <div className="flex flex-row h-[850px] overflow-y-auto">
            <SideBar
              user={user}
              show={isLargeScreen || SidebarOpen}
              onClose={handleSidebarOnClose}
            />
            <ChatChannel
              show={isLargeScreen || !SidebarOpen}
              hideChannelOnThread={!isLargeScreen}
            />
          </div>
        </Chat>
      </div>
    </div>
  );
};

export default DiscussionsPage;
