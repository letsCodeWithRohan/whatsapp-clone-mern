import { FaWhatsapp } from "react-icons/fa";
import Sidebar from '../Components/Sidebar';
import DefaultStatusScreen from '../Components/Status/DefaultStatusScreen';
import StatusSideBar from "../Components/Status/StatusSideBar";

function Status() {
    return (
        <div className='bg-base-300 flex flex-col overflow-hidden h-[100dvh] w-full'>
            <div className='flex items-center p-3 gap-2'>
                <FaWhatsapp className="text-green-500 text-xl" />
                <h1 className='text-sm font-semibold'>Whatsapp Clone</h1>
            </div>
            <div className="flex-1 flex h-0 min-h-0">
                <Sidebar />
                <div className="bg-base-100 flex-1 h-full min-h-0 flex rounded-tl-md overflow-hidden">
                    <StatusSideBar />
                    <DefaultStatusScreen />
                </div>
            </div>
        </div>
    )
}

export default Status