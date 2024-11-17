import { useState } from "react";
import Background from "@/assets/login2.png";
import Victory from "@/assets/victory.svg";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const { setUserInfo } = useAppStore();
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.length) {
            toast.error("Email is required");
            return false;
        }
        if (!emailRegex.test(email)) {
            toast.error("Invalid email format");
            return false;
        }
        return true;
    };
    const validteSignup = () => {
        if (!validateEmail()) return false;
        if (!password.length) {
            toast.error("Password is required");
            return false;
        }
        if (!confirmPassword.length) {
            toast.error("Confirm Password is required");
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match. Try again");
            return false;
        }
        return true;
    };

    const validateLogin = () => {
        if (!validateEmail()) return false;
        if (!password.length) {
            toast.error("Password is required");
            return false;
        }
        return true;
    };
    const handleLogin = async () => {
        if (!validateLogin()) return;
        try {
            const response = await apiClient.post(SIGN_IN_ROUTE, {
                email,
                password,
            });
            console.log(response);
        if (response.status === 200) {
            console.log(response.data.user.email);
            console.log(response.data.user.profileSetup);
            setUserInfo(response.data.user);
            if(response.data.user.profileSetup){
                console.log("profile setup");
                navigate("/chat");
            }else{
                console.log("profile not setup");
                navigate("/profile");
            }
            toast.success("Login successful");
        }
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.log(error.response);
        }
    };

    const handleSignup = async () => {
        if (!validteSignup()) return;
        try {
            const response = await apiClient.post(
                SIGN_UP_ROUTE,
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            );
            if (response.status === 201) {
                setUserInfo(response.data?.user);
                navigate("/profile");
                toast.success("Sign up successful. You can now login");
            } else {
                toast.error("An error occured. Try again");
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response);
            
        }
    };

    return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center">
            <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
                <div className="flex flex-col gap-10 items-center justify-center">
                    <div className="flex items-center justify-center flex-col">
                        <div className="flex items-center justify-center">
                            <h1 className="text-5xl font-bold md:text-6xl">
                                ConnecTide
                            </h1>
                            <img
                                src={Victory}
                                alt="victory image"
                                className="h-[100px]"
                            />
                        </div>
                        <p className="font-medium text-center">
                            Fill in the details to get started with the best
                            Chat app!
                        </p>
                    </div>
                    <div className="flex item-center justify-center w-full">
                        <Tabs className="w-3/4" defaultValue="login">
                            <TabsList className="bg-transparent rounded-none w-full">
                                <TabsTrigger
                                    value="login"
                                    className="data-[state:active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                                >
                                    Login
                                </TabsTrigger>
                                <TabsTrigger
                                    value="signup"
                                    className="data-[state:active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                                >
                                    SignUp
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent
                                className="flex flex-col gap-5 mt-10"
                                value="login"
                            >
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    className="rounded-full p-6"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    className="rounded-full p-6"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <Button
                                    className="rounded-full p-6"
                                    onClick={handleLogin}
                                >
                                    Log in
                                </Button>
                            </TabsContent>
                            <TabsContent
                                className="flex flex-col gap-5 mt-10"
                                value="signup"
                            >
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    className="rounded-full p-6"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    className="rounded-full p-6"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <Input
                                    placeholder="ConfirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    className="rounded-full p-6"
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                                <Button
                                    className="rounded-full p-6"
                                    onClick={handleSignup}
                                >
                                    Sign up
                                </Button>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <div className=" hidden xl:flex justify-center items-center">
                    <img
                        src={Background}
                        alt="Background login"
                        className="h-[700px]"
                    />
                </div>
            </div>
        </div>
    );
};
export default Auth;
