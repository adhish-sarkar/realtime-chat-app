// import React from 'react'

import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactContainer from "./components/contacts-container";
import EmptyChatContainer from "./components/empty-chat-container";
import ChatContainer from "./components/chat-container";

const Chat = () => {
    const { userInfo } = useAppStore();
    const navigate = useNavigate();
    useEffect(() => {
        if (!userInfo.profileSetup) {
            toast.info("Please complete your profile setup");
            navigate("/profile");
        }
    }, [userInfo, navigate]);

    return (
        <div className="flex h-[100vh] overflow-hidden">
            <ContactContainer />
            {/* <EmptyChatContainer /> */}
            <ChatContainer />
        </div>
    );
};

export default Chat;
