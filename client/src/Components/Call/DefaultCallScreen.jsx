import { FaVideo } from "react-icons/fa6";
import { IoLockClosedOutline } from 'react-icons/io5'
import { MdAddLink,MdDialpad } from "react-icons/md";

function DefaultCallScreen() {
    return (
        <div className="flex-1 relative h-full flex items-center justify-center flex-col gap-3">
            <div className='flex items-center gap-10'>
                <div className='flex flex-col items-center gap-3'>
                    <div className='h-[5em] hover:bg-base-300 w-[5em] rounded-lg bg-base-200 flex items-center justify-center'>
                        <FaVideo className="text-emerald-600 text-4xl" />
                    </div>
                    <span>Start call</span>
                </div>
                <div className='flex flex-col items-center gap-3'>
                    <div className='h-[5em] hover:bg-base-300 w-[5em] rounded-lg bg-base-200 flex items-center justify-center'>
                        <MdAddLink className="text-gray-600 text-4xl" />
                    </div>
                    <span>New call link</span>
                </div>
                <div className='flex flex-col items-center gap-3'>
                    <div className='h-[5em] hover:bg-base-300 w-[5em] rounded-lg bg-base-200 flex items-center justify-center'>
                        <MdDialpad className="text-gray-600 text-3xl" />
                    </div>
                    <span>Call a number</span>
                </div>
            </div>
            <p className="absolute bottom-[8%] flex items-center justify-center gap-2 text-sm text-gray-400 left-0 w-full text-center">
                <IoLockClosedOutline />
                Calls are end-to-end encrypted
            </p>
        </div>
    )
}

export default DefaultCallScreen
