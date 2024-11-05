import ChatHeader from "./components/chat-header"
import MessagesBar from "./components/message-bar"
import MessagesContainer from "./components/message-container"

const ChatContainer = () => {
  return (
    <div className=" fixed top-0 h-[100vh] w-auto] right-0 bg-[#1c1d25] flex flex-col">
        <ChatHeader />
        <MessagesContainer />
        <MessagesBar />
        </div>
  )
}

export default ChatContainer