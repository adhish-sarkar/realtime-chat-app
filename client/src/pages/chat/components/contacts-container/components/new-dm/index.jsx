import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { animationDefaultOptions } from "@/lib/utils";
import Lottie from "react-lottie";
import apiClient from "@/lib/api-client";
import { HOST, SEARCH_CONTACTS } from "@/utils/constants";
import { useAppStore } from "@/store";

const NewDM = () => {
    const { setSelectedChatType, setSelectedChatData } = useAppStore();
    const [openNewContactModal, setOpenNewContactModal] = useState(false);
    const [searchedContacts, setSetsearchedContacts] = useState([]);
    const searchContact = async (searchTerm) => {
        try {
            if (searchTerm.length <= 0) {
                setSetsearchedContacts([]);
                return;
            }
            const response = await apiClient.post(
                SEARCH_CONTACTS,
                { searchTerm },
                { withCredentials: true }
            );
            if (response.status === 200) {
                setSetsearchedContacts(response.data.contacts);
            }
        } catch (error) {
            console.log(error);
        }
        console.log(searchTerm);
    };

    const selectNewContact = (contact) => {
        console.log(contact);
        setOpenNewContactModal(false);
        setSetsearchedContacts([]);
        setSelectedChatType("dm");
        setSelectedChatData(contact);
    };
    return (
        // <div>new dm</div>
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus
                            className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
                            onClick={() => setOpenNewContactModal(true)}
                        />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
                        Select New Contact
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Dialog
                open={openNewContactModal}
                onOpenChange={ () => {
                    setOpenNewContactModal(false)
                    setSetsearchedContacts([]);
                }}
            >
                <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Please select a contact</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input
                            placeholder="Search contact"
                            className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                            onChange={(e) => searchContact(e.target.value)}
                        />
                    </div>
                    {
                        searchedContacts.length > 0 && (

                    <ScrollArea className={`h-[250px] ${searchedContacts.length > 0 ? '': 'hidden'}`}>
                        <div className="flex flex-col gap-5">
                            {searchedContacts.map((contact) => (
                                <div
                                    key={contact._id}
                                    className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[#2c2e3b] transition-all duration-300"
                                    onClick={() => selectNewContact(contact)}
                                >
                                    <div className="w-12 h-12 relative">
                                        <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                                            {contact.image ? (
                                                <AvatarImage
                                                    src={`${HOST}/${contact.image}`}
                                                    alt="profile"
                                                    className=" object-cover w-full h-full bg-black"
                                                />
                                            ) : (
                                                <div
                                                    className={`uppercase h-12 w-12  text-lg border-[1px] flex items-center
                                                        rounded-full justify-center ${getColor(
                                                        contact.color
                                                    )}`}
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
                                    <div className="flex flex-col">
                                        {contact.firstName && contact.lastName
                                            ? `${contact.firstName} ${contact.lastName}`
                                            : ""}
                                        <p className="text-gray-400 text-sm pl-2">
                                            {contact.email}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                        )
                    }
                    {searchedContacts.length <= 0 && (
                        <div className=" flex-1 md:bg-[#1c1d25] md:flex flex flex-col justify-center items-center duration-1000 transition-all">
                            <Lottie
                                isClickToPauseDisabled={true}
                                height={100}
                                width={100}
                                options={animationDefaultOptions}
                            />
                            <div className=" text-opacity-80 text-white flex flex-col mt-5 gap-5 items-center lg:text-2xl text-xl transition-all duration-300 text-center">
                                <h3 className="poppins-medium">
                                    Hi
                                    <span className=" text-purple-500">! </span>
                                    Search new
                                    <span className="text-purple-500">
                                        {" "}
                                        Contact.
                                    </span>
                                </h3>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default NewDM;
