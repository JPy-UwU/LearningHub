"use client";
import { StreamChat } from "stream-chat";
import { Channel, ChannelHeader, Chat , MessageInput, MessageList, Thread, Window} from "stream-chat-react"

const userId = "user_2VisWyZaR1EYCUB22uHzc8BgefK"

const chatClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_KEY!
)

chatClient.connectUser(
  {
    id: userId,
    name: "Sterben"
  },
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcl8yVmlzV3laYVIxRVlDVUIyMnVIemM4QmdlZksifQ.tqONrQE6LFUzP6h-YpkVXKHMLUrqZINWPFFt04TI2DY"

);

const channel = chatClient.channel("messaging", "channel_1", {
  name: "Channel #1",
  members: [userId]
})

const DiscussionsPage = () => {
  return (
    <div>
      <Chat client={chatClient}>
        <Channel channel = {channel}>
          <Window>
            <ChannelHeader/>
            <MessageList/>
            <MessageInput/>
          </Window>
          <Thread/>
        </Channel>
    
      </Chat>
    </div>
  );
}
 
export default DiscussionsPage;