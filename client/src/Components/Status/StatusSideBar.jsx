import { FaRegPenToSquare } from "react-icons/fa6";
import StatusUserTab from "./StatusUserTab";

function StatusSideBar() {
    return (
        <div className="w-[25%] h-full items-center p-3 justify-between gap-3 border-base-300 border-r-2 flex flex-col">
            <div className="flex items-center w-full justify-between">
                <h2 className="text-lg font-semibold">Status</h2>
                <div className="flex items-center gap-2">
                    <div className="h-[2em] w-[2em] rounded-sm hover:bg-base-200 flex items-center justify-center">
                        <FaRegPenToSquare className="text-md cursor-pointer" />
                    </div>
                </div>
            </div>
            {/* If viewed status then */}
            <p className="text-sm text-gray-300 w-full">Viewed updates</p>
            <div className="flex flex-col gap-2 flex-1 w-full overflow-y-auto">
                {/* Status list items would go here */}
                <StatusUserTab />
                <StatusUserTab />
            </div>
        </div>
    )
}

export default StatusSideBar
