"use client";

import { Chat, LoadingIndicator } from "stream-chat-react";
import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useWindowSize from "@/app/hooks/useWindowSize";
import { mdBreakpoint } from "@/lib/tailwind";
import { SideBar } from "./_comonents/chat-sidebar";
import useInitializeChatClient from "@/lib/chat-client";
import ChatChannel from "./_comonents/chat-channel";
import toast from "react-hot-toast";

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
      const response = await chatClient.queryUsers(
        { id: { $ne: "current_user_id" } },
        {},
        { limit: 100 }
      );
      const users = response.users;

      // Extract user IDs from the fetched users
      const userIds = users.map((user) => user.id);

      return userIds;
    } catch (error) {
      // Handle errors if the user query fails
      console.error("Error fetching user IDs:", error);
      return [];
    }
  };
  const createChannel = async () => {
    try {
      const allUserIds = await fetchAllUserIds(); // Wait for fetchAllUserIds to complete
      const channel = chatClient.channel(
        "messaging",
        channelName.replace(/\s/g, ""),
        {
          name: channelName,
          members: [...allUserIds],
        }
      );

      await channel.watch();
      setIsChannelCreated(true); // Update channel creation status
      toast.success("Channel created");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="h-full bg-gray-100 xl:px-3 xl:py-3">
      <div className="max-w-[1600px] min-w-[350px] h-[800px] shadow-sm m-auto flex flex-col">
        <Chat client={chatClient}>
          <div className="flex flex-row gap-x-5 py-2 items-center justify-center">
            {!isLargeScreen && (
              <div className="flex justify-center border-b border-b-[#DBDDE1] p-3 md:hidden">
                <button onClick={() => setSidebarOpen(!SidebarOpen)}>
                  {!SidebarOpen ? (
                    <span className="flex items-center gap-1">
                      <Menu />
                    </span>
                  ) : (
                    <X />
                  )}
                </button>
              </div>
            )}
            <Input
              placeholder="Ask a question"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="mr-2 max-w-4xl md:max-w-md"
            />
            {/* <button
              onClick={createChannel}
              className="border bg-blue-400 text-white rounded-lg p-1"
            >
              Post Question
            </button> */}
            <Button
              onClick={createChannel}
              >
              Post
            </Button>
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
