import { useEffect, useRef } from "react";
import { useAppStore } from "@/store";
import moment from "moment";
import apiClient from "@/lib/api-client";
import { GET_ALL_MESSAGES } from "@/utils/constants";
const MessagesContainer = () => {
    const scrollRef = useRef();
    const {
        selectedChatData,
        selectedChatType,
        userInfo,
        selectedChatMessages,
        setSelectedChatMessages,
    } = useAppStore();

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await apiClient.post(GET_ALL_MESSAGES, {
                    userId: selectedChatData._id,
                },{withCredentials: true});
                if(response.data.messages){
                    setSelectedChatMessages(response.data.messages);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (selectedChatData._id) {
            if (selectedChatType === "dm") {
                getMessages();
            }
        }
    }, [selectedChatData, selectedChatType, setSelectedChatMessages]);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [selectedChatMessages]);
    const renderMessages = () => {
        let lastDate = null;
        return selectedChatMessages.map((message, index) => {
            const messageDate = new moment(message.timeStamps).format(
                "YYYY-MM-DD"
            );
            const showDate = lastDate !== messageDate;
            lastDate = messageDate;
            return (
                <div key={index}>
                    {showDate && (
                        <div className="text-center text-gray-500 my-2">
                            {moment(message.timeStamps).format("LL")}
                        </div>
                    )}
                    {selectedChatType === "dm" && renderDmMessages(message)}
                </div>
            );
        });
    };

    const renderDmMessages = (message) => (
        <div
            className={`${
                message.sender === selectedChatData._id
                    ? "text-left"
                    : "text-right"
            }`}
        >
            {message.messageType === "text" && (
                <div
                    className={`${
                        message.sender !== selectedChatData._id
                            ? "bg-[#8417ff]/5 text-[#8417ff]/100 border-[#8417ff]/50"
                            : "bg-[#2a2b33]/5 text-white/90 border-[#ffffff]/20"
                    } border inline-block p-3 rounded my-1 max-w-[50%] break-words`}
                >
                    {message.content}
                </div>
            )}
            <div className="text-xs text-gray-600">
                {moment(message.timeStamps).format("LT")}
            </div>
        </div>
    );
    return (
        <div className=" flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:[80vw] w-full">
            {renderMessages()}
            <div ref={scrollRef}></div>
        </div>
    );
};

export default MessagesContainer;
