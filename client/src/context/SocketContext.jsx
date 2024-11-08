import { createContext, useContext, useEffect, useRef } from "react";
import { useAppStore } from "@/store";
import { io } from "socket.io-client";
import { HOST } from "@/utils/constants";

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const socket = useRef();
    const { userInfo } = useAppStore();

    useEffect(() => {
        if (userInfo) {
            socket.current = new io(HOST, {
                query: {
                    userId: userInfo._id,
                },
                withCredentials: true,
            });
            socket.current.on("connect", () => {
                console.log("Connected to socket server");
            });
            const handleRecieveMessage = async (message) => {
                const { selectedChatData, selectedChatType, addMessage, addContactsInDMContacts } =
                    useAppStore.getState();
                console.log(selectedChatData, selectedChatType);
                if (
                    selectedChatType !== undefined &&
                    (selectedChatData._id === message.sender._id ||
                        selectedChatData._id === message.recipient._id)
                ) {
                    console.log("Adding message to chat", message);
                    addMessage(message);
                    // selectedChatData.messages.push(message);
                    // selectedChatData.lastMessage = message;
                }
                addContactsInDMContacts(message);
            };

            const handleChannelRecieveMessage = async (message) => {
                const { selectedChatData, selectedChatType, addMessage, addChannelInChannelList } =
                    useAppStore.getState();
                    console.log(message, "from socket context")
                if(selectedChatType !== undefined && selectedChatData._id === message.channelId){
                    addMessage(message);
                }
                addChannelInChannelList(message);
            }
            socket.current.on("recieveMessage", handleRecieveMessage);
            socket.current.on("recieveChannelMessage", handleChannelRecieveMessage);

            return () => {
                socket.current.disconnect();
            };
        }
    }, [userInfo]);

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    );
};
