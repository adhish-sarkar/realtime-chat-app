import { useAppStore } from "@/store";
import { RiCloseFill } from "react-icons/ri";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HOST, SEARCH_CONTACTS } from "@/utils/constants";
import { getColor } from "@/lib/utils";

const ChatHeader = () => {
    const { closeChat, selectedChatData, selectedChatType } = useAppStore();
    return (
        <div className=" h-[8vh] border-b-2 border-[#2f303b] flex items-center justify-between px-2">
            <div className="w-full flex gap-5 item-center justify-between">
                <div className="flex gap-2 p-2 item-center justify-center">
                    <div className="w-12 h-12 relative flex items-center">
                        <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                            {selectedChatData.image ? (
                                <AvatarImage
                                    src={`${HOST}/${selectedChatData.image}`}
                                    alt="profile"
                                    className=" object-cover w-full h-full bg-black"
                                />
                            ) : (
                                <div
                                    className={`uppercase h-12 w-12  text-lg border-[1px] flex items-center justify-center ${getColor(
                                        selectedChatData.color
                                    )}`}
                                >
                                    {selectedChatData.firstName &&
                                    selectedChatData.lastName
                                        ? selectedChatData.firstName
                                              .split("")
                                              .shift() +
                                          selectedChatData.lastName
                                              ?.split("")
                                              .shift()
                                        : selectedChatData.email
                                              .split("")
                                              .shift()}
                                </div>
                            )}
                        </Avatar>
                    </div>
                    <div className="flex flex-col justify-center text-white poppins-medium">
                      {
                        selectedChatType === "dm" && 
                        <span>
                        {selectedChatData.firstName && selectedChatData.lastName
                            ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
                            : `${selectedChatData.email}`}
                        </span>
                      }
                        {/* <p className="text-gray-400 text-sm">
                            {selectedChatData.email}
                        </p> */}
                    </div>
                </div>
                <div className="flex item-center justify-center gap-5">
                    <button
                        className=" text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
                        onClick={closeChat}
                    >
                        <RiCloseFill size={30} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;
