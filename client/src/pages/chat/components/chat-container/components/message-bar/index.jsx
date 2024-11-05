import EmojiPicker from "emoji-picker-react";
import { useRef, useState, useEffect } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";

const MessagesBar = () => {
    const emojiRef = useRef(null);
    const handleSendMessage = async () => {};
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

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
    const [message, setMessage] = useState("");
    return (
        <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 gap-2">
            <div className="flex-1 flex rounded-md bg-[#2a2b33] items-center gap-5 pr-5">
                <input
                    type="text"
                    className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
                    placeholder="Enter a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className=" text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
                    <GrAttachment size={20} className="text-2xl" />
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
