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
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import useWindowSize from "@/app/hooks/useWindowSize";
import { mdBreakpoint } from "@/app/utils/tailwind";

const DiscussionsPage = () => {
  const chatClient = useInitializeChatClient();
  const { user } = useUser();

  const [SidebarOpen, setSidebarOpen] = useState(false);

  const windowSize = useWindowSize();
  const isLargeScreen = windowSize.width >= mdBreakpoint;

  useEffect(()=>{
    if (windowSize.width >= mdBreakpoint) setSidebarOpen(false);
  }, [windowSize.width])

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
        <div className="flex flex-row h-[850px]">
          <SideBar user={user} show={isLargeScreen || SidebarOpen} />
          <ChatChannel show={isLargeScreen ||!SidebarOpen} />
        </div>
      </Chat>
    </div>
  );
};

export default DiscussionsPage;
