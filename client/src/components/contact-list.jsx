import { useAppStore } from "@/store";
import { Avatar, AvatarImage } from "./ui/avatar";
import { getColor } from "@/lib/utils";
import { HOST } from "@/utils/constants";
const ContactList = ({ contacts, isChannel = false }) => {
    const {
        setSelectedChatData,
        setSelectedChatType,
        selectedChatData,
        selectedChatType,
        setSelectedChatMessages,
    } = useAppStore();

    const handleClick = (contact) => {
        setSelectedChatData(contact);
        setSelectedChatType(isChannel ? "channel" : "dm");
        if (selectedChatData?._id !== contact._id && selectedChatData) {
            setSelectedChatMessages([]);
        }
    };
    return (
        <div className="mt-5">
            {contacts.map((contact) => (
                <div
                    key={contact._id}
                    onClick={() => handleClick(contact)}
                    className={`flex items-center gap-3 pl-8 pr-5 py-2 w-full transition-all duration-300 cursor-pointer ${
                        selectedChatData && selectedChatData._id === contact._id
                            ? "bg-[#8417ff] hover:bg-[#8417ff]"
                            : "hover:bg-[#f1f1f111]"
                    }`}
                >
                    <div className="flex gap-5 items-center text-neutral-300 w-full">
                        {!isChannel && (
                            <div className="flex w-full gap-4">
                                <div className="w-10 h-10  relative">
                                    <Avatar
                                        className={`h-10 w-10 rounded-full`}
                                    >
                                        {contact.image ? (
                                            <AvatarImage
                                                src={`${HOST}/${contact.image}`}
                                                alt="profile"
                                                className={`${
                                                    selectedChatData &&
                                                    selectedChatData._id ===
                                                        contact._id
                                                        ? "bg-[#ffffff22] border-2 border-white"
                                                        : `${getColor(
                                                              contact.color
                                                          )}`
                                                } object-cover w-full h-full rounded-full bg-black`}
                                            />
                                        ) : (
                                            <div
                                                className={`
                                                ${
                                                    selectedChatData &&
                                                    selectedChatData._id ===
                                                        contact._id
                                                        ? "bg-[#ffffff22] border-2 border-white"
                                                        : `${getColor(
                                                              contact.color
                                                          )}`
                                                }
                                                uppercase h-10 w-10  text-lg 
                                                rounded-full overflow-hidden flex items-center justify-center `}
                                            >
                                                {contact.firstName &&
                                                contact.lastName
                                                    ? contact.firstName
                                                          .split("")
                                                          .shift() +
                                                      contact.lastName
                                                          ?.split("")
                                                          .shift()
                                                    : contact.email
                                                          .split("")
                                                          .shift()}
                                            </div>
                                        )}
                                    </Avatar>
                                </div>
                                <div
                                    className={`${
                                        selectedChatData &&
                                        selectedChatData._id === contact._id
                                            ? "font-bold"
                                            : ""
                                    } flex flex-col`}
                                >
                                    {contact.firstName && contact.lastName
                                        ? `${contact.firstName} ${contact.lastName}`
                                        : ""}
                                    <p className="text-gray-400 text-sm ">
                                        {contact.email}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ContactList;
