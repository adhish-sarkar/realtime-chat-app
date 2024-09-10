import React from 'react'
import Background from '@/assets/login2.png'
import Victory from "@/assets/victory.svg"
import { Tabs, TabsList,TabsContent,TabsTrigger } from '@/components/ui/tabs'
export const Auth = () => {
  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
        <div className='h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2'>
                <div className='flex flex-col gap-10 items-center justify-center'>
                    <div className='flex items-center justify-center flex-col'>
                        <div className='flex items-center justify-center'>
                            <h1 className='text-5xl font-bold md:text-6xl'>
                                Welcome
                            </h1>
                            <img src={Victory} alt="victory image" className='h-[100px]' />
                            <p className='font-medium text-center'>
                                Fill in the details to get started with the best Chat app!
                            </p>
                        </div>
                        <div className="flex item-center justify-center w-full">
                            <Tabs>
                                <TabsList>
                                    <TabsTrigger value='login'>Login</TabsTrigger>
                                    <TabsTrigger value='signup'>SignUp</TabsTrigger>
                                </TabsList>
                                <TabsContent></TabsContent>
                                <TabsContent></TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}
export default Auth