// import React from 'react'

import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactContainer from "./components/contacts-container";
import EmptyChatContainer from "./components/empty-chat-container";
import ChatContainer from "./components/chat-container";

const Chat = () => {
    const {
        userInfo,
        selectedChatType,
        // setSelectedChatData,
        isUploading,
        isDownloading,
        fileUploadProgress,
        fileDownloadProgress,
    } = useAppStore();
    const navigate = useNavigate();
    useEffect(() => {
        if (!userInfo.profileSetup) {
            toast.info("Please complete your profile setup");
            navigate("/profile");
        }
    }, [userInfo, navigate]);

    return (
        <div className="flex h-[100vh] w-[100vw] overflow-hidden">
            {isUploading && (
                <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg text-white">
                    <h5 className="text-5xl animate-pulse">Uploading File</h5>
                    {fileUploadProgress}%
                </div>
            )}
            {isDownloading && (
                <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg text-white">
                    <h5 className="text-5xl text-white animate-pulse">
                        Downloading File
                    </h5>
                    <span>{fileDownloadProgress}%</span>
                </div>
            )}
            <ContactContainer />
            {!selectedChatType ? <EmptyChatContainer /> : <ChatContainer />}
        </div>
    );
};

export default Chat;
