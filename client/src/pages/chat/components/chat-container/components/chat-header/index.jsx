
import { RiCloseFill } from 'react-icons/ri';

const ChatHeader = () => {
  return (
    <div className=" h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
        <div className="flex gap-5 item-center">
            <div className="flex gap-3 item-center justify-center">

            </div>
            <div className="flex item-center justify-center gap-5">
                <button className=" text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
                    <RiCloseFill size={20} className=' text-3xl'/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default ChatHeader