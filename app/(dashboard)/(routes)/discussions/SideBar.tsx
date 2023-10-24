import React from 'react'
import MenuBar from './MenuBar'
import { ChannelList } from 'stream-chat-react'
import { UserResource } from "@clerk/types"


interface ChatSidebarProps {
    user: UserResource;
    show: boolean,
}

export default function SideBar({user, show}: ChatSidebarProps) {
  return (
    <div className={`w-full flex-col md:max-w-[300px] ${show ? "flex" : "hidden"}`}>
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
                channelFilters:{
                    filters: { members: {$in:[user.id]} }
                }
            }
          }}
        />
        </div>
  )
}
