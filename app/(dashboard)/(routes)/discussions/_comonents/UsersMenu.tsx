import React, { useEffect, useState } from "react";
import {
  Avatar,
  useChatContext,
  LoadingChannels as LoadingUsers,
} from "stream-chat-react";
import { UserResource } from "@clerk/types";
import { Channel, UserResponse } from "stream-chat";
import { Button } from "@/components/ui/button";
import { map, set } from "zod";
import { ArrowLeft } from "lucide-react";
import { resolve } from "path";
import LoadingButton from "./LoadingButton";

interface UsersMenuProps {
  loggedInUser: UserResource;
  onClose: () => void;
  onChannelSelected: () => void;
}

export default function UsersMenu({
  loggedInUser,
  onClose,
  onChannelSelected,
}: UsersMenuProps) {
  const { client, setActiveChannel } = useChatContext();

  const [searchInput, setSearchInput] = useState("");
  const [moreUsersLoading, setMoreUsersLoading] = useState(false);
  const [endOfPaginationReached, setEndOfPaginationReached] = useState<boolean>();

  const pageSize = 10;

  const [users, setUsers] = useState<(UserResponse & { image?: string })[]>();
  useEffect(() => {
    async function loadInitialUsers() {
      setUsers(undefined);
      setEndOfPaginationReached(undefined);

      //await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const response = await client.queryUsers(
          {
            id: { $ne: loggedInUser.id },
            ...(searchInput ? {
              $or: [{
                name: {$autocomplete: searchInput}
              }, {id: {$autocomplete: searchInput}}]
            } : {}),
          },
          { id: 1 },
          { limit: pageSize + 1}
        );
        setUsers(response.users.slice(0, pageSize));
        setEndOfPaginationReached(response.users.length <= pageSize);
      } catch (error) {
        console.error(error);
        alert("Error loading users");
      }
    }
    loadInitialUsers();
  }, [client, loggedInUser.id, searchInput]);

  async function loadMoreUsers() {
    setMoreUsersLoading(true);
    try {
      const lastUserId = users?.[users.length-1].id
      if(!lastUserId){
        return;
      }
      const response = await client.queryUsers({
        $and: [{id: {$ne: loggedInUser.id}}, {id: {$gt: lastUserId}},
          searchInput
          ? {
            $or: [{
              name: {$autocomplete: searchInput}
            }, {id: {$autocomplete: searchInput}}]
          }
          :{}
        ],
      },
        
        {id: 1},
        {limit: pageSize + 1}
      );

      setUsers([... users, ...response.users.slice(0, pageSize)]);
      setEndOfPaginationReached(response.users.length<= pageSize);
    } catch (error) {
      console.error(error);
      alert("Error loading users");
    } finally{
      setMoreUsersLoading(false);
    }
  }

  function handleChannelSelected(channel: Channel) {
    setActiveChannel(channel);
    onChannelSelected();
  }

  async function startChatWithUser(userId: string) {
    try {
      const channel = client.channel("messaging", {
        members: [userId, loggedInUser.id],
      });
      await channel.create();
      handleChannelSelected(channel);
    } catch (error) {
      console.log(error);
      alert("Error creating channel");
    }
  }

  return (
    <div className="bg-white absolute z-10 h-full w-full str-chat border-e border-e-[#DBDDE1]">
      <div className="flex flex-col p-3">
        <div className="flex items-center gap-3 p3 text-lg font-bold py-3 mb-3">
          <ArrowLeft onClick={onClose} className="cursor-pointer" />
          Users
        </div>
        <input
          type="search"
          placeholder="Search"
          className="rounded-full border border-gray-300 px-4 py-2"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div>
        {!users && <LoadingUsers />}
        {users?.map((user) => (
          <UserResult
            user={user}
            onUserClicked={startChatWithUser}
            key={user.id}
          />
        ))}
        {endOfPaginationReached === false && (
          <LoadingButton
          onClick={loadMoreUsers}
          loading={moreUsersLoading}
          className="m-auto mb-3 w-[80%]">
            Load more users
          </LoadingButton>
        )}
      </div>
    </div>
  );
}

interface UserResultProps {
  user: UserResponse & { image?: string };
  onUserClicked: (userId: string) => void;
}

function UserResult({ user, onUserClicked }: UserResultProps) {
  return (
    <button
      className="mb-3 w-full flex items-center p-2 gap-2 hover:bg-[#e9eaed]"
      onClick={() => onUserClicked(user.id)}
    >
      <span>
        <Avatar image={user.image} name={user.name || user.id} size={40} />
      </span>
      <span className="whitespace-nowrap overflow-hidden text-ellipsis">
        {user.name || user.id}
      </span>
      {user.online && <span className="text-xs text-green-500">Online</span>}
    </button>
  );
}
