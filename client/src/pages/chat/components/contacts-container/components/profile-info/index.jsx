import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import { HOST, LOGOUT } from "@/utils/constants";
import { getColor } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FiEdit2 } from "react-icons/fi";
import { IoPowerSharp } from "react-icons/io5";
import apiClient from "@/lib/api-client";
import { useNavigate } from "react-router-dom";

const ProfileInfo = () => {
    const { userInfo , setUserInfo} = useAppStore();
    const navigate = useNavigate();
    const { firstName, lastName, email } = userInfo;
    const logout = async () => {
        try {
            const response = await apiClient.post(LOGOUT, {},{withCredentials: true});
            if(response.status === 200){
                navigate('/auth');
                setUserInfo(null);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
            <div className="flex gap-3 item-center justify-center">
                <div className="w-12 h-12 relative">
                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                        {userInfo.image ? (
                            <AvatarImage
                                src={`${HOST}/${userInfo.image}`}
                                alt="profile"
                                className=" object-cover w-full h-full bg-black"
                            />
                        ) : (
                            <div
                                className={`uppercase h-12 w-12  text-lg rounded-full flex items-center justify-center ${getColor(
                                    userInfo.color
                                )}`}
                            >
                                {firstName && lastName
                                    ? firstName.split("").shift() +
                                      lastName?.split("").shift()
                                    : email.split("").shift()}
                            </div>
                        )}
                    </Avatar>
                </div>
                <div>
                    <h1 className="text-white text-lg font-semibold">
                        {firstName} {lastName}
                    </h1>
                    <p className="text-gray-400 text-sm">{email}</p>
                    </div>
            </div>
            <div className="flex gap-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                        <FiEdit2 
                        className="text-purple-500 text-xl"
                        onClick={() => navigate('/profile')}
                        />
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#1c1b1e] text-purple-500 border-none">
                        Edit Profile
                        </TooltipContent>
                    </Tooltip>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                        <IoPowerSharp 
                        className="text-red-500 text-xl font-medium"
                        onClick={logout}
                        />
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#1c1b1e] text-red-500 border-none">
                        Logout
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                </TooltipProvider>
            </div>
        </div>
        
    );
};

export default ProfileInfo;
