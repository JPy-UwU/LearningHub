import React, { useCallback } from "react";
import MenuBar from "./MenuBar";
import {
  ChannelList,
  ChannelPreviewMessenger,
  ChannelPreviewUIComponentProps,
} from "stream-chat-react";
import { UserResource } from "@clerk/types";

interface ChatSidebarProps {
  user: UserResource;
  show: boolean;
  onClose: () => void;
}

export default function SideBar({ user, show, onClose }: ChatSidebarProps) {
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
      className={`w-full flex-col md:max-w-[300px] ${show ? "flex" : "hidden"}`}
    >
      <MenuBar />
      <ChannelList
        filters={{
          type: "messaging",
          members: { $in: [user.id] },
        }}
        sort={{ last_message_at: -1 }}
        options={{ state: true, presence: true, limit: 10 }}
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
