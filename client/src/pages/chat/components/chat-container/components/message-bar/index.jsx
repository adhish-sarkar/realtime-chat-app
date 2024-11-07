import EmojiPicker from "emoji-picker-react";
import { useRef, useState, useEffect } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import { useAppStore } from "@/store";
import { useSocket } from "@/context/SocketContext";
import apiClient from "@/lib/api-client";
import { UPLOAD_FILE } from "@/utils/constants";

const MessagesBar = () => {
    const emojiRef = useRef(null);
    const fileInputRef = useRef(null);
    const socket = useSocket();
    const { selectedChatData, selectedChatType, userInfo,setFileUploadProgress,setIsUploading } = useAppStore();
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setEmojiPickerOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [emojiRef]);

    const handleAddEmoji = (emoji) => {
        setMessage((msg) => msg + emoji.emoji);
    };
    const handleSendMessage = async () => {
        console.log(selectedChatType);
        if (selectedChatType === "dm") {
            socket.emit("sendMessage", {
                recipient: selectedChatData._id,
                sender: userInfo._id,
                content: message,
                messageType: "text",
                fileUrl: undefined,
            });
        }
    };

    const handleAttachmentClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleAttachmentChange = async (e) => {
        try {
            const file = e.target.files[0];
            if (!file) {
                return;
            }
            const formData = new FormData();
            formData.append("file", file);
            setIsUploading(true);
            const response = await apiClient.post(UPLOAD_FILE, formData, {
                withCredentials: true,
                onUploadProgress: (progressEvent) => {
                    setFileUploadProgress(
                        Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        )
                    );
                },
            });
            if (response.data.filePath) {
                setIsUploading(false);
                if (selectedChatType === "dm") {
                    socket.emit("sendMessage", {
                        recipient: selectedChatData._id,
                        sender: userInfo._id,
                        content: undefined,
                        messageType: "file",
                        fileUrl: response.data.filePath,
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 gap-2">
            <div className="flex-1 flex rounded-md bg-[#2a2b33] items-center gap-5 pr-5">
                <input
                    type="text"
                    className="flex-1 text-white p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
                    placeholder="Enter a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className=" text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
                onClick={handleAttachmentClick}>
                    <GrAttachment size={20} className="text-2xl" />
                <input
                className="hidden"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAttachmentChange}
                />
                </button>
                <div className="relative">
                    <button
                        className=" text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
                        onClick={() => setEmojiPickerOpen(true)}
                    >
                        <RiEmojiStickerLine size={20} className="text-2xl" />
                    </button>
                    <div className="absolute bottom-16 right-0" ref={emojiRef}>
                        <EmojiPicker
                            theme="dark"
                            open={emojiPickerOpen}
                            onEmojiClick={handleAddEmoji}
                            autoFocusSearch={true}
                        />
                    </div>
                </div>
            </div>
            <button
                className="bg-[#8417ff] rounded-md p-5 hover:text-white hover:bg-[#741bda] focus:bg-[#741bda] focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
                onClick={handleSendMessage}
            >
                <IoSend size={20} className="text-2xl" />
            </button>
        </div>
    );
};

export default MessagesBar;
