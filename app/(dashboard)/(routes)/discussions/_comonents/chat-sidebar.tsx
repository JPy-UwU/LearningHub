import React, { useCallback, useEffect, useState } from "react";
import {
  ChannelList,
  ChannelPreviewMessenger,
  ChannelPreviewUIComponentProps,
} from "stream-chat-react";
import { UserResource } from "@clerk/types";

import MenuBar from "./chat-menubar";
import UsersMenu from "./UsersMenu";

interface ChatSidebarProps {
  user: UserResource;
  show: boolean;
  onClose: () => void;
}

export function SideBar({ user, show, onClose }: ChatSidebarProps) {
  const [usersMenuOpen, setUsersMenuOpen] = useState(false);
  //const dateInThePast = new Date();
  //dateInThePast.setDate(dateInThePast.getDate() - 7); // Set it to x days ago

  useEffect(() => {
    if (!show) setUsersMenuOpen(false);
  }, [show])

  const ChannelPreviewCustom = useCallback(
    (props: ChannelPreviewUIComponentProps) => (
      <ChannelPreviewMessenger
        {...props}
        onSelect={() => {
          props.setActiveChannel?.(props.channel, props.watchers);
          onClose();
        }}
      />
    ),
    [onClose]
  );

  return (
    <div
      className={`relative w-full flex-col md:max-w-[300px] ${show ? "flex" : "hidden"}`}
    >
      {usersMenuOpen && 
        <UsersMenu loggedInUser={user} onClose={() => setUsersMenuOpen(false)} onChannelSelected={() => {
          setUsersMenuOpen(false);
          onClose;
        }}/>
      }
      <MenuBar onUserMenuClick={()=> setUsersMenuOpen(true)}/>
      <ChannelList
        filters={{
          type: "messaging",
          members: { $in: [user.id] },
          last_message_at: { $gt: "2020-10-10T16:01:49.27673Z" }, // filter out empty channels

        }}
        sort={{ last_message_at: -1 }}
        options={{ state: true, presence: true, limit: 10, watch: true }}
        showChannelSearch
        additionalChannelSearchProps={{
          searchForChannels: true,
          searchQueryParams: {
            channelFilters: {
              filters: { members: { $in: [user.id] } },
            },
          },
        }}
        Preview={ChannelPreviewCustom}
      />
    </div>
  );
}
