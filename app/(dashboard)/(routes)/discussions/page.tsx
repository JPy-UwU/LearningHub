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
  const [channelName, setChannelName] = useState("");
  const [SidebarOpen, setSidebarOpen] = useState(false);
  const [isChannelCreated, setIsChannelCreated] = useState(false);

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

  
  const fetchAllUserIds = async () => {
    try {
      // Query all users from Stream Chat (this example fetches user IDs only)
      const response = await chatClient.queryUsers({ id: { $ne: 'current_user_id' } }, {}, { limit: 100 });
      const users = response.users;
  
      // Extract user IDs from the fetched users
      const userIds = users.map(user => user.id);
  
      return userIds;
    } catch (error) {
      // Handle errors if the user query fails
      console.error('Error fetching user IDs:', error);
      return [];
    }
  };
  const createChannel = async () => {
    try {
      const allUserIds = await fetchAllUserIds(); // Wait for fetchAllUserIds to complete
      const channel = chatClient.channel("messaging", channelName.replace(/\s/g, ''), {
        name: channelName,
        members: [...allUserIds],
      });
  
      await channel.watch();
      setIsChannelCreated(true); // Update channel creation status
      console.log(channelName);
      console.log("success");
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };


  return (
    <div className="h-screen bg-gray-100 xl:px-3 xl:py-3">
      <div className="max-w-[1600px] min-w-[350px] h-[800px] shadow-sm m-auto flex flex-col">
        <Chat client={chatClient}>
        <div className="flex flex-row gap-x-5 py-2 items-center justify-center">
        <input 
              type="search" 
              placeholder="Ask a question"
              className="rounded-full border border-gray-300 px-4 py-2"
              value={channelName} // Bind input value to channelName state
              onChange={(e) => setChannelName(e.target.value)}
              
              />
        <button onClick={createChannel} className="border bg-blue-400 text-white rounded-lg p-1">
          Post Question
        </button>
        </div>
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
