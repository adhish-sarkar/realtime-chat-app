import { useEffect } from "react";
import NewDM from "./components/new-dm";
import ProfileInfo from "./components/profile-info";
import apiClient from "@/lib/api-client";
import { GET_CONTACTS_FOR_DM, GET_USER_CHANNELS } from "@/utils/constants";
import { useAppStore } from "@/store";
// import { useNavigate } from "react-router-dom";
import ContactList from "@/components/contact-list";
import CreateChannel from "./components/create-channel";

const ContactContainer = () => {

   const { setDirectMessagesContacts, directMessagesContacts, channels, setChannels} =  useAppStore();
    useEffect(() => {
        const getContacts = async () => {
            const response = await apiClient.get(GET_CONTACTS_FOR_DM, {
                withCredentials: true,
            });
            if (response.data.contacts) {
                setDirectMessagesContacts(response.data.contacts);
            }
        };
        getContacts();
        const getUserChannels = async () => {
            const response = await apiClient.get(GET_USER_CHANNELS, {
                withCredentials: true,
            });
            if (response.data.channels) {
                setChannels(response.data.channels);
            }
        };
        getUserChannels();
    }, [setChannels, setDirectMessagesContacts]);
    return (
        <div className=" relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
            <div className="pt-3">
                <Logo />
            </div>
            <div className="my-5">
                <div className="flex item-center justify-between pr-10">
                    <Title title="Direct Messages" />
                    <NewDM />
                </div>
                <div className="max-h-[38vh] overflow-auto scrollbar-hidden">
                    <ContactList contacts={directMessagesContacts}/>
                </div>
            </div>
            <div className="my-5">
                <div className="flex item-center justify-between pr-10">
                    <Title title="Channels" />
                    <CreateChannel />
                </div>
                <div className="max-h-[38vh] overflow-auto scrollbar-hidden">
                    <ContactList contacts={channels} isChannel={true}/>
                </div>
            </div>
            <ProfileInfo />
        </div>
    );
};

export default ContactContainer;

const Logo = () => {
    const {
        setSelectedChatType,
        // selectedChatType
    } =useAppStore();
    return (
        <div className="flex p-5  justify-start items-center gap-2">
            <svg
                id="logo-38"
                width="78"
                height="32"
                viewBox="0 0 78 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {" "}
                <path
                    d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
                    className="ccustom"
                    fill="#8338ec"
                ></path>{" "}
                <path
                    d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
                    className="ccompli1"
                    fill="#975aed"
                ></path>{" "}
                <path
                    d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
                    className="ccompli2"
                    fill="#a16ee8"
                ></path>{" "}
            </svg>
            <span className="text-3xl font-semibold text-white cursor-pointer select-none" onClick={()  => setSelectedChatType(false)}>ConnecTide</span>
        </div>
    );
};

const Title = ({ title }) => {
    return (
        <h6 className=" uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
            {title}
        </h6>
    );
};
