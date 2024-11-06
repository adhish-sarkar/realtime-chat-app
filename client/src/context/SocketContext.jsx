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
                const { selectedChatData, selectedChatType, addMessage } =
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
            };
            socket.current.on("recieveMessage", handleRecieveMessage);

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
